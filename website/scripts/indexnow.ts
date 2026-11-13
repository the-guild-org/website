/**
 * Submits the pages that changed since the previous production deploy to
 * IndexNow. Run by CI after the Cloudflare Pages deploy, never during the
 * build: the changed pages have to be live before search engines fetch them.
 *
 * The previous deploy's fingerprints come from the manifest file (kept in
 * the Actions cache). With no manifest there is nothing to compare against,
 * so the first run only records one. The manifest is written only after a
 * successful submission, so a failed run is retried by the next deploy.
 *
 * Usage: node scripts/indexnow.ts [--dry-run] [manifest path]
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { SITE_ORIGIN } from '../src/hive/lib/base-path.ts';
import {
  changedUrls,
  INDEXNOW_BATCH_SIZE,
  INDEXNOW_KEY,
  pageFingerprint,
  type PageManifest,
} from '../src/lib/indexnow.ts';
import { distFileFor, PROJECT_DIR, readSitemapPaths } from './lib/build-output.ts';
import { loadProducts } from './products/registry.ts';

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const manifestPath = path.resolve(
  args.find(arg => !arg.startsWith('--')) ?? `${PROJECT_DIR}/.cache/indexnow/manifest.json`,
);

// Only pages in the sitemaps: indexable, canonical to themselves, in this build.
const productSitemaps = (await loadProducts()).map(
  product => `/graphql/${product.slug}/sitemap.xml`,
);
const current: PageManifest = {};
for (const pathname of readSitemapPaths(productSitemaps)) {
  const file = distFileFor(pathname);
  if (!file?.endsWith('.html')) continue;
  current[pathname] = pageFingerprint(readFileSync(file, 'utf8'));
}

const pageCount = Object.keys(current).length;
if (pageCount === 0) {
  console.error('indexnow: no sitemap pages found in dist; run the build first');
  process.exit(1);
}

function saveManifest() {
  if (dryRun) return;
  mkdirSync(path.dirname(manifestPath), { recursive: true });
  writeFileSync(manifestPath, JSON.stringify(current));
}

if (!existsSync(manifestPath)) {
  saveManifest();
  console.log(`indexnow: no previous manifest; recorded ${pageCount} pages, nothing submitted`);
  process.exit(0);
}

const previous = JSON.parse(readFileSync(manifestPath, 'utf8')) as PageManifest;
const urls = changedUrls(previous, current).map(pathname => `${SITE_ORIGIN}${encodeURI(pathname)}`);

if (urls.length === 0) {
  console.log(`indexnow: none of ${pageCount} pages changed`);
  process.exit(0);
}

console.log(`indexnow: ${urls.length} of ${pageCount} pages changed`);
for (const url of urls.slice(0, 50)) console.log(`  ${url}`);
if (urls.length > 50) console.log(`  ... and ${urls.length - 50} more`);

if (dryRun) process.exit(0);

for (let start = 0; start < urls.length; start += INDEXNOW_BATCH_SIZE) {
  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: new URL(SITE_ORIGIN).host,
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_ORIGIN}/${INDEXNOW_KEY}.txt`,
      urlList: urls.slice(start, start + INDEXNOW_BATCH_SIZE),
    }),
  });
  // 200: accepted. 202: accepted, key validation pending.
  if (response.status !== 200 && response.status !== 202) {
    console.error(`indexnow: submission failed with ${response.status} ${await response.text()}`);
    process.exit(1);
  }
}

saveManifest();
console.log('indexnow: submitted');
