import Toucan from 'toucan-js';
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
    options.sentry.setFingerprint([
      requestedEndpoint.replace('https://www.', 'https://'),
      String(options.response.status),
    ]);
    options.sentry.setExtras({
      'User Endpoint': requestedEndpoint,
      'Upstream Endpoint': options.endpoint,
      'Error Code': options.response.status,
    });
    options.sentry.captureException(new Error(`GET ${requestedEndpoint}: HTTP ${options.response.status}`));

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

export function redirect(url: string, code = 301) {
  return new Response(null, {
    status: code,
    headers: {
      Location: url,
    },
  });
}

export type ManipulateResponseFn = (record: RewriteRecord, response: Response) => Promise<Response>;

export async function handleRewrite(options: {
  event: FetchEvent;
  cacheStorageId: number;
  sentry: Toucan;
  record: RewriteRecord;
  fallbackRoute: RewriteRecord;
  upstreamPath: string;
  cfFetchCacheTtl: number;
  manipulateResponse: ManipulateResponseFn;
}) {
  const url = `https://${options.record.rewrite}${options.upstreamPath}`;
  const cacheKey = new Request(url, options.event.request);
  const cache = await caches.open(String(options.cacheStorageId));
  let response = await cache.match(cacheKey);

  if (!response) {
    const freshResponse = await fetch(url, {
      // This cache will force caching between the CF Worker and the upstream website, based on Cache-Control headers that are
      // being set by Vercel or CloudFlare Pages.
      cf: {
        cacheTtl: options.cfFetchCacheTtl,
        cacheEverything: true,
      },
    });

    // In case of an error from an upstream, we are going to return the original request, and avoid caching.
    if (freshResponse.status >= 400) {
      // This error handler captures an error from the origin.
      return await handleErrorResponse({
        sentry: options.sentry,
        request: options.event.request,
        endpoint: url,
        response: freshResponse,
        cfFetchCacheTtl: options.cfFetchCacheTtl,
        fallbackRoute: options.fallbackRoute,
      });
    }

    response = await options.manipulateResponse(options.record, freshResponse);

    // Make sure the worker wait behind the scenes, for the Response content.
    options.event.waitUntil(cache.put(cacheKey, response.clone()));
  }

  return response;
}
