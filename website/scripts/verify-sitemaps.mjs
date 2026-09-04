/**
 * Fails the build if any <loc> in the generated sitemaps does not correspond
 * to a file in dist — the exact defect class from the SEO audit (SEO-01),
 * where the Hive sitemap shipped 15 URLs that 404'd in production, pricing
 * included.
 */
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { SITE_ORIGIN as SITE } from '../src/hive/lib/base-path.ts';

const dist = fileURLToPath(new URL('../dist', import.meta.url));

/** Maps a public path to the dist file that serves it (build.format: 'file'). */
function distCandidates(pathname) {
  if (pathname === '/' || pathname === '') return [`${dist}/index.html`];
  const decoded = decodeURI(pathname);
  return [`${dist}${decoded}.html`, `${dist}${decoded}/index.html`, `${dist}${decoded}`];
}

const failures = [];
let checked = 0;

for (const sitemap of ['/sitemap-0.xml', '/graphql/hive/sitemap.xml']) {
  const file = `${dist}${sitemap}`;
  if (!existsSync(file)) {
    failures.push(`${sitemap}: sitemap file missing from dist`);
    continue;
  }
  const xml = readFileSync(file, 'utf8');
  for (const [, loc] of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    checked++;
    if (!loc.startsWith(SITE)) {
      failures.push(`${sitemap}: <loc> outside the site: ${loc}`);
      continue;
    }
    const pathname = loc.slice(SITE.length);
    if (!distCandidates(pathname).some(candidate => existsSync(candidate))) {
      failures.push(`${sitemap}: no dist file serves ${pathname || '/'}`);
    }
  }
}

// The index must reference both children.
const index = readFileSync(`${dist}/sitemap.xml`, 'utf8');
for (const child of [`${SITE}/sitemap-0.xml`, `${SITE}/graphql/hive/sitemap.xml`]) {
  if (!index.includes(`<loc>${child}</loc>`)) {
    failures.push(`sitemap.xml index does not reference ${child}`);
  }
}

if (failures.length > 0) {
  console.error(`Sitemap verification failed (${failures.length} problems):`);
  for (const failure of failures.slice(0, 25)) console.error(`  ${failure}`);
  process.exit(1);
}

console.log(`Sitemaps verified: ${checked} URLs all resolve to built files`);
