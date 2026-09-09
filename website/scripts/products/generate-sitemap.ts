import { globSync, writeFileSync } from 'node:fs';
import { productSiteUrl } from '../../src/products/define.ts';
import { DIST } from '../lib/build-output.ts';
import { loadProducts } from './registry.ts';

// No <lastmod>: the content's git history lives in each product's repo, not
// here, so dates would only reflect fetch times.
for (const product of await loadProducts()) {
  const distDirectory = `${DIST}/graphql/${product.slug}`;
  const pages = [
    { path: '' },
    ...globSync('**/*.html', { cwd: distDirectory })
      .filter(file => file !== '404.html' && file !== 'index.html')
      .map(file => ({ path: `/${file.replace(/\/index\.html$/, '').replace(/\.html$/, '')}` })),
  ].sort((a, b) => a.path.localeCompare(b.path));
  const siteUrl = productSiteUrl(product);
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
