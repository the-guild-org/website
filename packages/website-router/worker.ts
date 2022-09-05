/* eslint-disable no-console */

import { jsonConfig } from './config';
import type { RewriteRecord } from './config';
import Toucan from 'toucan-js';

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
const KEYS = Object.keys(mappings);

function redirect(url: string, code = 301) {
  return new Response(null, {
    status: code,
    headers: {
      Location: url,
    },
  });
}

function shouldSkipErrorReporting(requestedUrl: string, rawUserAgent: string | null): boolean {
  const userAgent = (rawUserAgent || '').toLowerCase();
  const isBot =
    userAgent.includes('bot') ||
    userAgent.includes('spider') ||
    userAgent.includes('crawler') ||
    userAgent.includes('go-http-client');

  // Inspired by: https://mentalhealthathome.org/2020/08/09/bad-bots/
  return (
    isBot ||
    [
      'siteminderagent',
      'sites/default/files',
      'webmail',
      'api/1.1/jot',
      'api/2/',
      '/i/api/',
      'sw.js',
      'system/debug',
      'administrator/',
      'wp-includes',
      'alfacgiapi',
      'wp-commentin',
      'ajax',
      'wp-admin',
      'admin/index',
      'wp-login',
      'wp-json',
      '.well-known',
      '/_next/',
      '/link-preview',
      '.php',
      'wpadmin',
      'wp-content',
      'vendor',
      'vuln.htm',
      'fckeditor',
      'xxxss',
      'data/admin',
      'ads.txt',
      'app-ads.txt',
      'humans.txt',
      'Telerik',
      'login',
      'wgetrc',
      '.azure-pipelines.yml',
      'cgi-bin',
      'visualrf',
      'fmlurlsvc',
      'weathermap',
    ].some(v => requestedUrl.includes(v)) ||
    [
      '.tar.gz',
      '.rar',
      '.zip',
      '.tgz',
      '.php',
      '.env',
      '/logos',
      '/images',
      '/uploads',
      '/files',
      '/extension',
      '.jsp',
      '.yml',
      '.yaml',
      '.config',
      '.conf',
    ].some(v => requestedUrl.endsWith(v))
  );
}

async function handleErrorResponse(sentry: Toucan, request: Request, endpoint: string, response: Response) {
  console.error(`Failed to fetch ${endpoint}`, response.status, response);
  const requestedEndpoint = request.url;

  const shouldReport =
    response.status >= 400 && !shouldSkipErrorReporting(requestedEndpoint, request.headers.get('user-agent'));

  if (shouldReport && SENTRY_DSN) {
    sentry.setFingerprint([requestedEndpoint, String(response.status)]);
    sentry.setExtras({
      'User Endpoint': requestedEndpoint,
      'Upstream Endpoint': endpoint,
      'Error Code': response.status,
    });
    sentry.captureException(new Error(`GET ${requestedEndpoint}: HTTP ${response.status}`));

    return await fetch(`https://${fallbackRoute.rewrite}/404`, {
      cf: {
        cacheTtl: cfFetchCacheTtl,
        cacheEverything: true,
      },
    });
  }

  return response;
}

class SitemapElementHandler {
  private additionalUrls: string[];

  constructor(additionalUrls: string[]) {
    this.additionalUrls = additionalUrls;
  }

  element(element) {
    element.append(this.additionalUrls.map(url => `<sitemap><loc>${url}</loc></sitemap>`).join('\n'), { html: true });
  }
}

class HeadElementHandler {
  private websiteRecord: RewriteRecord;

  constructor(websiteRecord: RewriteRecord) {
    this.websiteRecord = websiteRecord;
  }

  element(element) {
    if (crispWebsiteId) {
      element.append(
        `<script>
          window.$crisp = [];
          window.CRISP_WEBSITE_ID = '${crispWebsiteId}';
          (function () {
            d = document;
            s = d.createElement('script');
            s.src = 'https://client.crisp.chat/l.js';
            s.async = 1;
            d.getElementsByTagName('head')[0].appendChild(s);
          })();
          ${
            this.websiteRecord.crispSegments && this.websiteRecord.crispSegments.length > 0
              ? `
            window.$crisp.push([
              'set',
              'session:segments',
              [${JSON.stringify(this.websiteRecord.crispSegments)}],
            ]);
            `
              : ''
          }
        </script>`,
        { html: true }
      );
    }

    if (gaTrackingId) {
      element.append(
        `
        <script async src="https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaTrackingId}');
        </script>`,
        { html: true }
      );
    }
  }
}

function composeSitemap(response, additionalUrls) {
  if (response && response.headers && response.headers.get('content-type').startsWith('application/xml')) {
    return new HTMLRewriter().on('sitemapindex', new SitemapElementHandler(additionalUrls)).transform(response);
  }

  return response;
}

function applyHtmlTransformations(record, response) {
  if (response && response.headers && response.headers.get('content-type').startsWith('text/html')) {
    return new HTMLRewriter().on('head', new HeadElementHandler(record)).transform(response);
  }

  return response;
}

async function handleRewrite(
  event: FetchEvent,
  sentry: Toucan,
  record: RewriteRecord,
  upstreamPath: string,
  skipCache = false
) {
  const url = `https://${record.rewrite}${upstreamPath}`;
  const cacheKey = new Request(url, event.request);
  const cache = await caches.open(String(cacheStorageId));
  let response = await cache.match(cacheKey);

  if (!response || skipCache) {
    const freshResponse = await fetch(url, {
      // This cache will force caching between the CF Worker and the upstream website, based on Cache-Control headers that are
      // being set by Vercel or CloudFlare Pages.
      cf: skipCache
        ? {}
        : {
            cacheTtl: cfFetchCacheTtl,
            cacheEverything: true,
          },
    });

    // In case of an error from an upstream, we are going to return the original request, and avoid caching.
    if (freshResponse.status >= 400) {
      // This error handler captures an error from the origin.
      return await handleErrorResponse(sentry, event.request, url, freshResponse);
    }

    response = applyHtmlTransformations(record, freshResponse) as Response;

    // Modify response and add client side caching headers
    response = new Response(response.body, response);

    // TODO: Are they any special headers we need to consider to add? SEO-related?
    response.headers.append('Cache-Control', `s-maxage=${clientToWorkerMaxAge}`);

    // Make sure the worker wait behind the scenes, for the Response content.
    event.waitUntil(cache.put(cacheKey, response.clone()));
  }

  return response;
}

async function handleEvent(event: FetchEvent, sentry: Toucan) {
  // Remove all trailing slashes
  if (event.request.url.endsWith('/')) {
    return redirect(event.request.url.slice(0, -1));
  }

  const parsedUrl = new URL(event.request.url);

  // Handle sitemap
  if (parsedUrl.pathname === '/sitemap.xml') {
    const response = await handleRewrite(event, sentry, fallbackRoute, parsedUrl.pathname, true);
    const additionalSitemaps = KEYS.flatMap(key => {
      const item = mappings[key];

      if (item && 'rewrite' in item && item.sitemap) {
        return [`${parsedUrl.origin}${key}/sitemap.xml`];
      }

      return [];
    });

    return composeSitemap(response, additionalSitemaps);
  }

  // Handle all favicon in one place
  if (parsedUrl.pathname.endsWith('favicon.ico')) {
    return fetch(`https://${fallbackRoute.rewrite}/favicon.ico`);
  }

  // Unified robots, we do this to avoid any conflicts, so we always take the root one
  if (parsedUrl.pathname !== '/robots.txt' && parsedUrl.pathname.endsWith('robots.txt')) {
    return redirect(`https://${publicDomain}/robots.txt`);
  }

  // Handle all feed/rss in one place
  if (['/feed', '/feeds', '/feed/', '/feeds/', '/rss', '/rss/', '/rss.xml'].some(v => parsedUrl.pathname.endsWith(v))) {
    return redirect(`https://${publicDomain}/feed.xml`);
  }

  const match = KEYS.find(key => parsedUrl.pathname.startsWith(key));

  if (match) {
    sentry.addBreadcrumb({
      message: `Matched route: ${match}`,
      level: 'debug',
    });
    const record = mappings[match];

    if ('rewrite' in record) {
      return await handleRewrite(event, sentry, record, parsedUrl.pathname.replace(match, ''));
    }

    if ('redirect' in record) {
      return redirect(record.redirect, record.status || 301);
    }
  }

  // this will delegate the request to the fallback endpoint
  return await handleRewrite(event, sentry, fallbackRoute, parsedUrl.pathname);
}

addEventListener('fetch', event => {
  const sentry = new Toucan({
    dsn: SENTRY_DSN,
    context: event,
    environment: 'production',
    release: RELEASE,
    attachStacktrace: true,
    allowedHeaders: [
      'content-type',
      'content-length',
      'accept',
      'accept-language',
      'accept-encoding',
      'user-agent',
      'referer',
      'host',
    ],
  });

  event.respondWith(
    handleEvent(event, sentry).catch(e => {
      sentry.setExtras({
        'User Endpoint': event.request.url,
      });
      sentry.captureException(e);

      throw e;
    })
  );
});
