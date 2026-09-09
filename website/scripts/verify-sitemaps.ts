/**
 * Fails the build if any <loc> in the generated sitemaps does not correspond
 * to a built file, or if the sitemap index does not reference both children —
 * the SEO audit's defect class where 15 sitemap URLs 404'd in production.
 */
import { existsSync, readFileSync } from 'node:fs';
import { basePath, SITE_ORIGIN } from '../src/hive/lib/base-path.ts';
import {
  SITEMAPS as BASE_SITEMAPS,
  DIST,
  readSitemapPaths,
  resolvesInDist,
} from './lib/build-output.ts';
import { loadProducts } from './products/registry.ts';

const PRODUCT_SITEMAPS = (await loadProducts()).map(
  product => `/graphql/${product.slug}/sitemap.xml`,
);
const SITEMAPS = [...BASE_SITEMAPS, ...PRODUCT_SITEMAPS];

const failures: string[] = [];

for (const sitemap of SITEMAPS) {
  if (!existsSync(`${DIST}${sitemap}`)) {
    failures.push(`${sitemap}: sitemap file missing from dist`);
  }
}

const paths = readSitemapPaths(PRODUCT_SITEMAPS);
for (const pathname of paths) {
  if (!resolvesInDist(pathname)) {
    failures.push(`no dist file serves ${pathname}`);
  }
}

const index = readFileSync(`${DIST}/sitemap.xml`, 'utf8');
for (const child of SITEMAPS) {
  if (!index.includes(`<loc>${SITE_ORIGIN}${child}</loc>`)) {
    failures.push(`sitemap.xml index does not reference ${child}`);
  }
}

if (failures.length > 0) {
  console.error(`Sitemap verification failed (${failures.length} problems):`);
  for (const failure of failures.slice(0, 25)) console.error(`  ${failure}`);
  process.exit(1);
}

console.log(
  `Sitemaps verified: ${paths.size} URLs all resolve to built files (${basePath} included)`,
);
