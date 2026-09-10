import { globSync, writeFileSync } from 'node:fs';
import { MESH_SITE_URL } from '../../src/mesh/lib/base-path.ts';
import { DIST } from '../lib/build-output.ts';

const distDirectory = `${DIST}/graphql/mesh`;

// No <lastmod>: the content's git history lives in the Mesh repo, not here,
// so dates would only reflect fetch times.
const pages = [
  { path: '' },
  ...globSync('**/*.html', { cwd: distDirectory })
    .filter(file => file !== '404.html')
    .map(file => ({ path: `/${file.replace(/\/index\.html$/, '').replace(/\.html$/, '')}` })),
].sort((a, b) => a.path.localeCompare(b.path));

const urls = pages
  .map(({ path }) => `  <url><loc>${MESH_SITE_URL}${encodeURI(path)}</loc></url>`)
  .join('\n');

writeFileSync(
  `${distDirectory}/sitemap.xml`,
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`,
);
console.log(`Generated mesh sitemap.xml with ${pages.length} URLs`);
