/**
 * Fails the build if any <loc> in the generated sitemaps does not correspond
 * to a built file, or if the sitemap index does not reference both children —
 * the SEO audit's defect class where 15 sitemap URLs 404'd in production.
 * Also fails when a listed page is noindex or canonicalises to another URL:
 * GSC flags submitted URLs like that ("Excluded by 'noindex' tag",
 * "Alternate page with proper canonical tag") and emails about them.
 */
import { existsSync, readFileSync } from 'node:fs';
import { basePath, SITE_ORIGIN } from '../src/hive/lib/base-path.ts';
import {
  SITEMAPS as BASE_SITEMAPS,
  DIST,
  distFileFor,
  readIndexingSignals,
  readSitemapPaths,
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
  const file = distFileFor(pathname);
  if (!file) {
    failures.push(`no dist file serves ${pathname}`);
    continue;
  }
  if (!file.endsWith('.html')) continue;
  const { canonical, noindex } = readIndexingSignals(readFileSync(file, 'utf8'));
  if (noindex) failures.push(`${pathname} is listed but noindex`);
  if (canonical && decodeURI(canonical) !== `${SITE_ORIGIN}${pathname === '/' ? '/' : pathname}`) {
    failures.push(`${pathname} is listed but canonicalises to ${canonical}`);
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
  `Sitemaps verified: ${paths.size} URLs all resolve to indexable, self-canonical built files (${basePath} included)`,
);
