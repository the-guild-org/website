import { jsonConfig } from './config';
import Toucan from 'toucan-js';
import { createSentry } from './error-handling/sentry';
import { handleSitemap, shouldHandleSitemap } from './sitemap/handler';
import { handleRobotsTxt, shouldHandleRobotsTxt } from './robots/handler';
import { handleRewrite, redirect, ManipulateResponseFn } from './routing';
import { FaviconHandler } from './favicon/transformer';
import { CrispHandler } from './html-handlers/crisp';
import { GoogleAnalyticsHandler } from './html-handlers/ga';
import { handleFavicon, shouldHandleFavicon } from './favicon/handler';
import { handleFeed, shouldHandleFeed } from './feed/handler';

declare const SENTRY_DSN: string;
declare const RELEASE: string;

const {
  publicDomain,
  mappings,
  crispWebsiteId,
  gaTrackingId,
  clientToWorkerMaxAge,
  cfFetchCacheTtl,
  cacheStorageId,
  fallbackRoute,
} = jsonConfig;

const manipulateResponse: ManipulateResponseFn = async (record, rawResponse) => {
  let result = rawResponse;

  if (result && result.headers && result.headers.get('content-type')?.startsWith('text/html')) {
    result = new HTMLRewriter()
      .on('head', new FaviconHandler())
      .on('head', new CrispHandler(crispWebsiteId, record))
      .on('head', new GoogleAnalyticsHandler(gaTrackingId))
      .transform(result);
  }

  // Modify response and add client side caching headers
  result = new Response(result.body, result);
  result.headers.append('Cache-Control', `s-maxage=${clientToWorkerMaxAge}`);

  return result;
};

async function handleEvent(event: FetchEvent, sentry: Toucan) {
  const parsedUrl = new URL(event.request.url);

  // Remove all trailing slashes
  if (event.request.url.endsWith('/') && parsedUrl.pathname !== '/' && parsedUrl.pathname !== '') {
    return redirect(event.request.url.slice(0, -1));
  }

  // Handle sitemap
  if (shouldHandleSitemap(parsedUrl)) {
    return handleSitemap(parsedUrl, `https://${fallbackRoute.rewrite}/sitemap.xml`, mappings);
  }

  // Handle all favicon, manifests and so on
  if (shouldHandleFavicon(parsedUrl)) {
    return handleFavicon(parsedUrl, fallbackRoute);
  }

  // Unified robots, we do this to avoid any conflicts, so we always take the root one
  if (shouldHandleRobotsTxt(parsedUrl)) {
    return handleRobotsTxt(publicDomain);
  }

  // Handle all feed/rss in one place
  if (shouldHandleFeed(parsedUrl)) {
    return handleFeed(publicDomain);
  }

  const match = Object.keys(mappings).find(key => parsedUrl.pathname.startsWith(key));

  if (match) {
    sentry.addBreadcrumb({ message: `Matched route: ${match}`, level: 'debug' });
    const record = mappings[match];

    if ('rewrite' in record) {
      return await handleRewrite({
        cacheStorageId,
        cfFetchCacheTtl,
        event,
        fallbackRoute,
        sentry,
        manipulateResponse,
        record,
        upstreamPath: parsedUrl.pathname.replace(match, ''),
      });
    }

    if ('redirect' in record) {
      return redirect(record.redirect, record.status || 301);
    }
  }

  // this will delegate the request to the fallback endpoint
  return await handleRewrite({
    cacheStorageId,
    cfFetchCacheTtl,
    event,
    fallbackRoute,
    sentry,
    upstreamPath: parsedUrl.pathname,
    manipulateResponse,
    record: fallbackRoute,
  });
}

addEventListener('fetch', (event: FetchEvent) => {
  const sentry = createSentry(event, SENTRY_DSN, RELEASE);

  event.respondWith(
    handleEvent(event, sentry).catch(e => {
      sentry.setExtras({
        'User Endpoint': event.request.url,
      });

      if (event.request.headers.has('cf-connecting-ip')) {
        sentry.setUser({
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          ip_address: event.request.headers.get('cf-connecting-ip')!,
        });
      }

      sentry.captureException(e);

      throw e;
    })
  );
});
