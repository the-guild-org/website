/**
 * Fails the build when dist/_redirects would send a crawler somewhere bad
 * (SEO-18): a fixed destination that is not a page in the build or is itself a
 * redirect source (a chain), a static source that shadows a real page, a wildcard
 * rule whose bare parent has no rule of its own (`/x/*` does not match `/x`),
 * although its destination is a page, or a sitemap URL that is itself a redirect source (a sitemap should list
 * destinations, SEO-17).
 */
import { readdirSync } from 'node:fs';
import { DIST, readRedirects, readSitemapPaths, resolvesInDist } from './lib/build-output.ts';
import { loadProducts } from './products/registry.ts';

/** Whether one of the files serving `pathname` exists with exactly this spelling. */
function existsExactCase(pathname: string): boolean {
  const decoded = decodeURI(pathname);
  const candidates = [`${decoded}.html`, `${decoded}/index.html`, decoded];
  return candidates.some(candidate => {
    const slash = candidate.lastIndexOf('/');
    const directory = `${DIST}${candidate.slice(0, slash)}`;
    try {
      return readdirSync(directory).includes(candidate.slice(slash + 1));
    } catch {
      return false;
    }
  });
}

const rules = readRedirects();
const failures: string[] = [];

const sources = new Set(rules.map(rule => rule.source));
for (const { source, destination } of rules) {
  const target = destination.split('#')[0]!;
  if (target.startsWith('/') && !/[*:]/.test(target) && !resolvesInDist(target)) {
    failures.push(`${source} redirects to ${target}, which is not a page in the build`);
  }
  // A destination that is itself a redirect source is a chain: two crawls
  // where one would do, and Google reports the hop.
  if (sources.has(target)) {
    failures.push(`${source} redirects to ${target}, which is itself a redirect source`);
  }
  // A static source that is a page in the build shadows that page at the edge.
  // (Exact case: Pages is case-sensitive, a macOS checkout is not.)
  if (!/[*:]/.test(source) && resolvesInDist(source) && existsExactCase(source)) {
    failures.push(`${source} is a page in the build but is shadowed by its redirect rule`);
  }
  // `/x/*` never matches `/x`; when the destination without the splat is a
  // page, the bare parent needs its own rule (when it is not, a 404 there is
  // right — there is nothing to redirect to).
  const bareTarget = destination.replace(/\/:splat.*$/, '');
  if (
    source.endsWith('/*') &&
    !sources.has(source.slice(0, -2)) &&
    bareTarget.startsWith('/') &&
    resolvesInDist(bareTarget)
  ) {
    failures.push(`${source} has no rule for its bare parent ${source.slice(0, -2)}`);
  }
}

const dynamicSources = rules
  .map(rule => rule.source)
  .filter(source => /[*:]/.test(source))
  .map(source => ({
    source,
    pattern: new RegExp(
      `^${source
        .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
        .replace(/\*/g, '.*')
        .replace(/:[A-Za-z_]+/g, '[^/]+')}$`,
    ),
  }));
const productSitemaps = (await loadProducts()).map(
  product => `/graphql/${product.slug}/sitemap.xml`,
);
for (const pathname of readSitemapPaths([...productSitemaps, '/graphql/mesh/sitemap.xml'])) {
  if (sources.has(pathname)) failures.push(`sitemap lists ${pathname}, which is a redirect source`);
  const shadow = dynamicSources.find(({ pattern }) => pattern.test(pathname));
  if (shadow)
    failures.push(`sitemap lists ${pathname}, shadowed by the wildcard rule ${shadow.source}`);
}

if (failures.length > 0) {
  console.error(`Redirect verification failed (${failures.length} problems):`);
  for (const failure of failures.slice(0, 30)) console.error(`  ${failure}`);
  process.exit(1);
}
console.log(
  `Redirects verified: ${rules.length} rules, every fixed destination is a page, every wildcard has a bare parent, no sitemap URL redirects`,
);
