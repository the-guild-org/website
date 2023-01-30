import { WebsiteRecord } from '../config.js';
import { SitemapTransformer } from './transformer.js';

function composeSitemap(response, additionalUrls) {
  if (response?.headers?.get('content-type').startsWith('application/xml')) {
    return new HTMLRewriter()
      .on('sitemapindex', new SitemapTransformer(additionalUrls))
      .transform(response);
  }

  return response;
}

export function shouldHandleSitemap(url: URL) {
  return url.pathname === '/sitemap.xml';
}

export async function handleSitemap(
  eventUrl: URL,
  rootSitemapUrl: string,
  mappings: Record<string, WebsiteRecord>,
) {
  const response = await fetch(rootSitemapUrl, {
    cf: {
      cacheEverything: true,
    },
  });

  const additionalSitemaps = Object.keys(mappings).flatMap(key => {
    const item = mappings[key];

    if (item && 'rewrite' in item && item.sitemap) {
      return [`${eventUrl.origin}${key}/sitemap.xml`];
    }

    return [];
  });

  return composeSitemap(response, additionalSitemaps);
}
