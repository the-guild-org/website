import { globSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { routeRules } from '../../src/hive/documentation/redirects.ts';
/**
 * The Hive site is mounted at /graphql/hive of the unified deployment, and
 * Cloudflare Pages only reads root-level _redirects — so every rule is
 * written with the mount prefix. Redirect sources/destinations in
 * redirects.ts stay un-prefixed (they predate the merge and read naturally).
 */
import { basePath as PREFIX } from '../../src/hive/lib/base-path.ts';
import { DIST } from '../lib/build-output.ts';

const outputDirectory = DIST;
const outputFile = `${DIST}/_redirects`;

const prefixPath = (path: string) =>
  path.startsWith('/') && !path.startsWith(PREFIX) ? `${PREFIX}${path}` : path;

/**
 * Redirects that only apply to the Astro deployment: the old site serves raw
 * per-page MDX at /llms.mdx/docs/*, which this site replaces with /docs/*.md.
 */
const astroOnlyRedirects = [
  {
    source: `${PREFIX}/llms.mdx/docs/*`,
    destination: `${PREFIX}/docs/:splat.md`,
    status: 301,
  },
];

/**
 * Old Guild-blog posts that migrated into the Hive blog kept their slugs; the
 * root URLs 404'd for over a year, splitting backlink equity (SEO audit,
 * SEO-02). Derived from the built output so new Hive posts are covered
 * automatically and posts that exist on the root blog are never shadowed.
 */
const rootBlogSlugs = new Set(
  globSync('blog/*.html', { cwd: outputDirectory }).map(file =>
    file.replace(/^blog\//, '').replace(/\.html$/, ''),
  ),
);
const migratedBlogRedirects = globSync('graphql/hive/blog/*.html', {
  cwd: outputDirectory,
})
  .map(file => file.replace(/^graphql\/hive\/blog\//, '').replace(/\.html$/, ''))
  .filter(slug => slug !== 'feed.xml' && !rootBlogSlugs.has(slug))
  .map(slug => ({
    source: `/blog/${slug}`,
    destination: `${PREFIX}/blog/${slug}`,
    status: 301,
  }));

/**
 * Dead-URL families Google still recrawls (SEO audit, SEO-03): pages that
 * shipped without the base path from earlier build bugs. The route-template
 * leaks (/_landing/..., $-segments) get 410s from the router worker instead —
 * Pages _redirects cannot emit 410.
 */
const deadFamilyRedirects = [
  { source: '/docs/*', destination: `${PREFIX}/docs/:splat`, status: 301 },
  { source: '/product-updates/*', destination: `${PREFIX}/product-updates/:splat`, status: 301 },
  { source: '/case-studies/*', destination: `${PREFIX}/case-studies/:splat`, status: 301 },
];

const redirects = [
  ...migratedBlogRedirects,
  ...deadFamilyRedirects,
  ...Object.entries(routeRules).map(([source, rule]) => {
    if (!rule.redirect || typeof rule.redirect === 'string') {
      throw new Error(`Expected ${source} to contain a redirect object`);
    }

    return {
      source: prefixPath(source.replace(/\/\*\*$/, '/*')),
      destination: prefixPath(rule.redirect.to),
      status: rule.redirect.status,
    };
  }),
  ...astroOnlyRedirects,
].sort((a, b) => Number(a.source.endsWith('/*')) - Number(b.source.endsWith('/*')));

const MARKER =
  '# Generated from website/src/hive/documentation/redirects.ts. Do not edit manually.';

const hiveBlock = [
  MARKER,
  ...redirects.map(({ source, destination, status }) => `${source} ${destination} ${status}`),
  '',
].join('\n');

// astro build copies website/public/_redirects (main-site rules) into dist;
// keep it and append the Hive block after it. Stripping from the marker
// makes re-runs idempotent.
const existing = await readFile(outputFile, 'utf8').catch(() => '');
const mainSiteRules = existing.split(MARKER)[0]!.replace(/\n+$/, '');
const contents = mainSiteRules ? `${mainSiteRules}\n\n${hiveBlock}` : hiveBlock;

await mkdir(outputDirectory, { recursive: true });
await writeFile(outputFile, contents);

console.log(`Generated ${redirects.length} redirects in ${outputFile}`);
