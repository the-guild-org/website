import { Toucan } from 'toucan-js';
import { jsonConfig, RedirectRecord, RewriteRecord, WebsiteRecord } from './config';
import { Env } from './env';
import { createSentry } from './error-handling/sentry';
import { handleFavicon, shouldHandleFavicon } from './favicon/handler';
import { FaviconHandler } from './favicon/transformer';
import { handleFeed, shouldHandleFeed } from './feed/handler';
import { BannerHandler } from './html-handlers/banner';
import { CrispHandler } from './html-handlers/crisp';
import { GoogleAnalyticsHandler } from './html-handlers/ga';
import { handleRobotsTxt, shouldHandleRobotsTxt } from './robots/handler';
import { handleRewrite, ManipulateResponseFn, redirect } from './routing';
import { handleSitemap, shouldHandleSitemap } from './sitemap/handler';

const {
  publicDomain,
  mappings,
  crispWebsiteId,
  gaTrackingId,
  clientToWorkerMaxAge,
  cfFetchCacheTtl,
  cacheStorageId,
  fallbackRoute,
  defaultBanner,
  koaliaPk,
} = jsonConfig;

function isRewriteRecord(record: WebsiteRecord): record is RewriteRecord {
  return 'rewrite' in record;
}

function isRedirectRecord(record: WebsiteRecord): record is RedirectRecord {
  return 'redirect' in record;
}

const manipulateResponse: ManipulateResponseFn = async (record, rawResponse) => {
  let result = rawResponse;

  if (result?.headers?.get('content-type')?.startsWith('text/html')) {
    result = new HTMLRewriter()
      .on('head', new FaviconHandler())
      .on('head', new CrispHandler(crispWebsiteId, record))
      .on('body', new BannerHandler(defaultBanner || record.banner))
      .on('head', new GoogleAnalyticsHandler(gaTrackingId))
      .transform(result);
  }

  // Modify response and add client side caching headers
  result = new Response(result.body, result);
  result.headers.append('Cache-Control', `s-maxage=${clientToWorkerMaxAge}`);

  return result;
};

async function handleEvent(request: Request, sentry: Toucan): Promise<Response> {
  const parsedUrl = new URL(request.url);
  sentry.addBreadcrumb({
    type: 'debug',
    data: {
      clientUrl: request.url,
    },
    level: 'info',
    message: 'Parsed incoming request URL',
  });

  // Remove all trailing slashes
  if (request.url.endsWith('/') && parsedUrl.pathname !== '/' && parsedUrl.pathname !== '') {
    const to = request.url.slice(0, -1);

    sentry.addBreadcrumb({
      type: 'navigation',
      data: {
        from: request.url,
        to,
      },
      level: 'info',
      message: 'Redirecting to non-trailing slash URL',
    });

    return redirect(sentry, request.url, to);
  }

  // Remove all www && https && http from the URL
  if (parsedUrl.hostname.startsWith('www.')) {
    const to = request.url.replace('//www.', '//');

    sentry.addBreadcrumb({
      type: 'navigation',
      data: {
        from: request.url,
        to,
      },
      level: 'info',
      message: 'Redirecting to non-trailing www URL',
    });

    return redirect(sentry, request.url, to);
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

    return handleRobotsTxt(sentry, request.url, publicDomain);
  }

  // Handle all feed/rss in one place
  if (shouldHandleFeed(parsedUrl)) {
    sentry.addBreadcrumb({
      type: 'debug',
      level: 'info',
      message: 'Handling feed/RSS flow',
    });

    return handleFeed(sentry, request.url, publicDomain);
  }

  const match = Object.keys(mappings).find(path => {
    // make sure that all match path parts are present in the request path's
    // parts (in order). this way we avoid false positives with .startsWith like:
    // "/graphql/codegenASDF" matching "/graphql/codegen"
    const requestPathParts = parsedUrl.pathname.split('/');
    return path.split('/').every((part, index) => requestPathParts[index] === part);
  }) as keyof typeof mappings | undefined;

  if (match) {
    sentry.setTag('website.match', match);
    sentry.addBreadcrumb({
      level: 'debug',
      message: `Matched route: ${match}`,
      data: {
        pathname: parsedUrl.pathname,
      },
    });

    const record = mappings[match];

    if (isRewriteRecord(record)) {
      sentry.addBreadcrumb({
        level: 'debug',
        message: 'Handling as rewrite route',
      });

      return await handleRewrite({
        cacheStorageId,
        cfFetchCacheTtl,
        request,
        fallbackRoute,
        sentry,
        manipulateResponse,
        record,
        upstreamPath: parsedUrl.pathname.replace(match, ''),
        match,
        publicDomain,
      });
    }

    if (isRedirectRecord(record)) {
      return redirect(sentry, request.url, record.redirect, record.status || 301);
    }
  }

  sentry.addBreadcrumb({
    level: 'debug',
    message: 'No matching upstream website, will try now the root domain...',
  });

  // this will delegate the request to the fallback endpoint
  return await handleRewrite({
    cacheStorageId,
    cfFetchCacheTtl,
    request,
    fallbackRoute,
    sentry,
    upstreamPath: parsedUrl.pathname,
    manipulateResponse,
    record: fallbackRoute,
    match: null,
    publicDomain,
  });
}

// eslint-disable-next-line import/no-default-export
export default {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async fetch(request: Request, env: Env, context: EventContext<Env, any, any>): Promise<Response> {
    const sentry = createSentry(request, context, env.SENTRY_DSN);

    return handleEvent(request, sentry)
      .then(resultResponse => {
        sentry.addBreadcrumb({
          type: 'debug',
          message: 'Composed final response object',
          data: {
            status: resultResponse.status,
            // headers: resultResponse.headers,
          },
        });

        return resultResponse;
      })
      .catch(e => {
        sentry.setExtras({
          'Client Endpoint': request.url,
        });

        if (request.headers.has('cf-connecting-ip')) {
          sentry.setUser({
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            ip_address: request.headers.get('cf-connecting-ip')!,
          });
        }

        sentry.captureException(e);

        throw e;
      });
  },
};
