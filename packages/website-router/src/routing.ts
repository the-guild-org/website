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
}) {
  const requestedEndpoint = options.request.url;

  const shouldReport =
    options.response.status >= 400 &&
    !shouldSkipErrorReporting(requestedEndpoint, options.request.headers.get('user-agent'));

  if (shouldReport) {
    options.sentry.configureScope(scope => {
      scope.setFingerprint([
        requestedEndpoint.replace('https://www.', 'https://'),
        String(options.response.status),
      ]);
    });

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
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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

    return new Response(errorResponseContent.body, {
      status: options.response.status,
      headers: errorResponseContent.headers,
    });
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
      Referer: from,
    },
  });
}

export type ManipulateResponseFn = (record: RewriteRecord, response: Response) => Promise<Response>;

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
}): Promise<Response> {
  const url = `https://${options.record.rewrite}${options.upstreamPath || ''}`;
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

      const containsUppercase = /[A-Z]/.test(options.upstreamPath);

      if (containsUppercase) {
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
      });
    }

    response = await options.manipulateResponse(options.record, freshResponse);

    // Make sure the worker wait behind the scenes, for the Response content.
    await cache.put(cacheKey, response.clone());
  }

  return response;
}
