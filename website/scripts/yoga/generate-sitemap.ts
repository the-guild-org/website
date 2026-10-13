import { writeFileSync } from 'node:fs';
import { YOGA_SITE_URL } from '../../src/yoga/lib/base-path.ts';
import { DIST, sitemapPagePaths } from '../lib/build-output.ts';

const distDirectory = `${DIST}/graphql/yoga-server`;

// No <lastmod>: the content's git history lives in the Yoga repo, not here,
// so dates would only reflect fetch times.
const pages = [
  { path: '' },
  ...sitemapPagePaths(distDirectory, YOGA_SITE_URL).map(path => ({ path })),
].sort((a, b) => a.path.localeCompare(b.path));

const urls = pages
  .map(({ path }) => `  <url><loc>${YOGA_SITE_URL}${encodeURI(path)}</loc></url>`)
  .join('\n');

writeFileSync(
  `${distDirectory}/sitemap.xml`,
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`,
);
console.log(`Generated yoga sitemap.xml with ${pages.length} URLs`);
