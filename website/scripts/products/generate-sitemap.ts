import { writeFileSync } from 'node:fs';
import { productSiteUrl } from '../../src/products/define.ts';
import { DIST, sitemapPagePaths } from '../lib/build-output.ts';
import { loadProducts } from './registry.ts';

// No <lastmod>: the content's git history lives in each product's repo, not
// here, so dates would only reflect fetch times.
for (const product of await loadProducts()) {
  const distDirectory = `${DIST}/graphql/${product.slug}`;
  const siteUrl = productSiteUrl(product);
  const pages = [
    { path: '' },
    ...sitemapPagePaths(distDirectory, siteUrl, ['404.html', 'index.html']).map(path => ({ path })),
  ].sort((a, b) => a.path.localeCompare(b.path));
  const escapeXml = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const urls = pages
    .map(({ path }) => `  <url><loc>${escapeXml(`${siteUrl}${encodeURI(path)}`)}</loc></url>`)
    .join('\n');
  writeFileSync(
    `${distDirectory}/sitemap.xml`,
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`,
  );
  console.log(`[${product.slug}] sitemap.xml with ${pages.length} URLs`);
}
