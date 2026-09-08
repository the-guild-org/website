import { Toucan } from 'toucan-js';
import type { RewriteRecord } from './config';
import { shouldSkipErrorReporting } from './error-handling/error-reporting';

async function handleErrorResponse(options: {
  sentry: Toucan;
  request: Request;
  response: Response;
  endpoint: string;
  cfFetchCacheTtl: number;
  fallbackRoute: RewriteRecord;
  manipulateResponse: ManipulateResponseFn;
}) {
  const requestedEndpoint = options.request.url;

  const shouldReport =
    options.response.status >= 400 &&
    !shouldSkipErrorReporting(requestedEndpoint, options.request.headers.get('user-agent'));

  if (shouldReport) {
    options.sentry.setFingerprint([
      requestedEndpoint.replace('https://www.', 'https://'),
      String(options.response.status),
    ]);

    // clone to allow the original response to be reused
    const clonedBody = await options.response.clone().text();
    const headers: Record<string, string> = {};
    for (const [key, val] of options.response.headers.entries()) {
      headers[key] = val;
    }
    options.sentry.setExtras({
      'User Endpoint': requestedEndpoint,
      'Upstream Endpoint': options.endpoint,
      'Error Code': options.response.status,
      'Status Text': options.response.statusText,
      Headers: JSON.stringify(headers),
      Body: clonedBody,
    });

    if (options.request.headers.has('cf-connecting-ip')) {
      options.sentry.setUser({
        ip_address: options.request.headers.get('cf-connecting-ip')!,
      });
    }

    // return original response if it isnt a 404, will help with
    // debugging especially if Cloudflare is blocking the request
    if (options.response.status !== 404) {
      // we don't want to report 404
      options.sentry.captureException(
        new Error(` ${options.response.status}: ${requestedEndpoint} `),
      );

      return options.response;
    }

    const errorResponseContent = await fetch(`https://${options.fallbackRoute.rewrite}/404`, {
      cf: {
        cacheTtl: options.cfFetchCacheTtl,
        cacheEverything: true,
      },
    });

    // Inject analytics and other HTMLRewriter handlers
    const rewrittenNotFound = await options.manipulateResponse(
      options.fallbackRoute,
      new Response(errorResponseContent.body, {
        status: options.response.status,
        headers: errorResponseContent.headers,
      }),
    );
    return rewrittenNotFound;
  }

  return options.response;
}

export function redirect(sentry: Toucan, from: string, url: string, code = 301) {
  sentry.addBreadcrumb({
    type: 'debug',
    level: 'info',
    category: 'navigation',
    data: {
      from,
      to: url,
    },
    message: 'Redirecting',
  });

  return new Response(null, {
    status: code,
    headers: {
      Location: url,
    },
  });
}

export type ManipulateResponseFn = (record: RewriteRecord, response: Response) => Promise<Response>;

export function buildUpstreamUrl(options: {
  request: Request;
  record: RewriteRecord;
  upstreamPath: string;
}) {
  const upstreamUrl = new URL(`https://${options.record.rewrite}${options.upstreamPath || ''}`);

  if (options.record.preserveSearch) {
    upstreamUrl.search = new URL(options.request.url).search;
  }

  return upstreamUrl;
}

export async function handleRewrite(options: {
  request: Request;
  cacheStorageId: number;
  sentry: Toucan;
  record: RewriteRecord;
  fallbackRoute: RewriteRecord;
  upstreamPath: string;
  cfFetchCacheTtl: number;
  manipulateResponse: ManipulateResponseFn;
  match: string | null;
  publicDomain: string;
  waitUntil: (promise: Promise<unknown>) => void;
}): Promise<Response> {
  const url = buildUpstreamUrl(options).toString();
  const cacheKey = new Request(url, options.request);
  const cache = await caches.open(String(options.cacheStorageId));
  let response = await cache.match(cacheKey);

  options.sentry.setTag('cache.upstream', response ? 'hit' : 'miss');
  options.sentry.addBreadcrumb({
    type: 'debug',
    message: `Upstream fetch cache result is: ${response ? 'HIT' : 'MISS'}`,
    data: {
      url,
    },
  });

  if (!response) {
    const freshResponse = await fetch(url, {
      // This cache will force caching between the CF Worker and the upstream website, based on Cache-Control headers that are
      // being set by Vercel or CloudFlare Pages.
      cf: {
        cacheTtl: options.cfFetchCacheTtl,
        cacheEverything: true,
      },
      redirect: 'manual',
    });

    if (freshResponse.status >= 301 && freshResponse.status <= 308) {
      const upstreamLocation = freshResponse.headers.get('location');
      const hasMatchingWebsite = options.match !== null;

      options.sentry.addBreadcrumb({
        type: 'debug',
        message: 'Received redirect response from upstream website',
        data: {
          status: freshResponse.status,
          to: upstreamLocation,
          hasMatchingWebsite,
        },
      });

      if (!hasMatchingWebsite || upstreamLocation?.startsWith('http')) {
        return freshResponse;
      }

      return redirect(
        options.sentry,
        options.request.url,
        `https://${options.publicDomain}${options.match}${upstreamLocation}`,
        301,
      );
    }

    // In case of an error from an upstream, we are going to return the original request, and avoid caching.
    if (freshResponse.status >= 400) {
      options.sentry.addBreadcrumb({
        type: 'error',
        message: 'Upstream returned HTTP error',
        data: {
          status: freshResponse.status,
        },
      });

      // Only a 404 can plausibly be a case mismatch; retrying 5xx just
      // doubles upstream load.
      const containsUppercase = /[A-Z]/.test(options.upstreamPath);

      if (freshResponse.status === 404 && containsUppercase) {
        const asLower = options.upstreamPath.toLowerCase();

        options.sentry.addBreadcrumb({
          type: 'info',
          message: 'Trying lower case now',
          data: {
            original: options.upstreamPath,
            lower: asLower,
          },
        });

        return await handleRewrite({
          ...options,
          upstreamPath: asLower,
        });
      }

      // This error handler captures an error from the origin.
      return await handleErrorResponse({
        sentry: options.sentry,
        request: options.request,
        endpoint: url,
        response: freshResponse,
        cfFetchCacheTtl: options.cfFetchCacheTtl,
        fallbackRoute: options.fallbackRoute,
        manipulateResponse: options.manipulateResponse,
      });
    }

    response = await options.manipulateResponse(options.record, freshResponse);

    if (options.request.method === 'GET') {
      // Populate the cache in the background - the response does not wait.
      options.waitUntil(cache.put(cacheKey, response.clone()));
    }
  }

  return response;
}

/**
 * Old build bugs leaked route templates into public URLs (/_landing/...,
 * literal $-segments). Google still recrawls them; they deserve a 410.
 */
export function isLeakedRouteTemplate(pathname: string) {
  return pathname.includes('/_landing/') || /(^|\/)\$(\/|$)/.test(pathname);
}

/**
 * The single canonical form of a public URL: no www, no trailing slash
 * (search preserved). Returns null when the URL is already canonical, so the
 * caller emits at most one 301 instead of a redirect chain.
 */
export function canonicalizeUrl(url: URL): string | null {
  const canonical = new URL(url);
  if (canonical.hostname.startsWith('www.')) {
    canonical.hostname = canonical.hostname.slice(4);
  }
  if (canonical.pathname.length > 1 && canonical.pathname.endsWith('/')) {
    canonical.pathname = canonical.pathname.replace(/\/+$/, '');
  }
  return canonical.toString() === url.toString() ? null : canonical.toString();
}
