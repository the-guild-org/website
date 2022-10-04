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

async function handleEvent(event: FetchEvent, sentry: Toucan): Promise<Response> {
  const parsedUrl = new URL(event.request.url);
  sentry.addBreadcrumb({
    type: 'debug',
    data: {
      clientUrl: event.request.url,
    },
    level: 'info',
    message: 'Parsed incoming request URL',
  });

  // Remove all trailing slashes
  if (event.request.url.endsWith('/') && parsedUrl.pathname !== '/' && parsedUrl.pathname !== '') {
    const to = event.request.url.slice(0, -1);

    sentry.addBreadcrumb({
      type: 'navigation',
      data: {
        from: event.request.url,
        to,
      },
      level: 'info',
      message: 'Redirecting to non-trailing slash URL',
    });

    return redirect(sentry, event.request.url, to);
  }

  // Handle sitemap
  if (shouldHandleSitemap(parsedUrl)) {
    sentry.addBreadcrumb({
      type: 'debug',
      level: 'info',
      message: 'Handling sitemap.xml request',
    });

    return handleSitemap(parsedUrl, `https://${fallbackRoute.rewrite}/sitemap.xml`, mappings);
  }

  // Handle all favicon, manifests and so on
  if (shouldHandleFavicon(parsedUrl)) {
    sentry.addBreadcrumb({
      type: 'debug',
      level: 'info',
      message: 'Handling favicon flow',
    });

    return handleFavicon(parsedUrl, fallbackRoute);
  }

  // Unified robots, we do this to avoid any conflicts, so we always take the root one
  if (shouldHandleRobotsTxt(parsedUrl)) {
    sentry.addBreadcrumb({
      type: 'debug',
      level: 'info',
      message: 'Handling robots.txt flow',
    });

    return handleRobotsTxt(sentry, event.request.url, publicDomain);
  }

  // Handle all feed/rss in one place
  if (shouldHandleFeed(parsedUrl)) {
    sentry.addBreadcrumb({
      type: 'debug',
      level: 'info',
      message: 'Handling feed/RSS flow',
    });

    return handleFeed(sentry, event.request.url, publicDomain);
  }

  const match = Object.keys(mappings).find(key => parsedUrl.pathname.startsWith(key));

  if (match) {
    sentry.setTag('website.match', parsedUrl.pathname);
    sentry.addBreadcrumb({
      level: 'debug',
      message: `Matched route: ${match}`,
      data: {
        pathname: parsedUrl.pathname,
      },
    });

    const record = mappings[match];

    if ('rewrite' in record) {
      sentry.addBreadcrumb({
        level: 'debug',
        message: `Handling as rewrite route`,
      });

      return await handleRewrite({
        cacheStorageId,
        cfFetchCacheTtl,
        event,
        fallbackRoute,
        sentry,
        manipulateResponse,
        record,
        upstreamPath: parsedUrl.pathname.replace(match, ''),
        match,
        publicDomain,
      });
    }

    if ('redirect' in record) {
      return redirect(sentry, event.request.url, record.redirect, record.status || 301);
    }
  }

  sentry.addBreadcrumb({
    level: 'debug',
    message: `No matching upstream website, will try now the root domain...`,
  });

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
    match: null,
    publicDomain,
  });
}

addEventListener('fetch', (event: FetchEvent) => {
  const sentry = createSentry(event, SENTRY_DSN, RELEASE);

  event.respondWith(
    handleEvent(event, sentry)
      .then(resultResponse => {
        sentry.addBreadcrumb({
          type: 'debug',
          message: `Composed final response object`,
          data: {
            status: resultResponse.status,
            // headers: resultResponse.headers,
          },
        });

        return resultResponse;
      })
      .catch(e => {
        sentry.setExtras({
          'Client Endpoint': event.request.url,
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
