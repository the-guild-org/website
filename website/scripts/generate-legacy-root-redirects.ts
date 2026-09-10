/**
 * Redirects for the root-level paths of the old, separate product sites
 * (SEO-09). Before the sites were unified, /docs/…, /tutorial/… and /v<n>/…
 * were served by graphql-tools, graphql-ws, Yoga, Envelop, Mesh, Hive and
 * others at the root of their own domains, so Google still asks for them
 * here. A single catch-all into one product sent most of them to a 404; this
 * resolves each path against the build output instead: a legacy root path
 * redirects to the first product (in PRIORITY order) that actually has that
 * page, and paths no product has stay plain 404s.
 *
 * Rule budget: one wildcard per directory that a single product dominates
 * (its other owners' pages get static rules first, and static rules win),
 * static rules for the rest. Runs after every product's own redirects.
 */
import { existsSync, readdirSync } from 'node:fs';
import { DIST, publicPath, resolvesInDist } from './lib/build-output.ts';
import {
  barePartnerRules,
  checkLimits,
  isRule,
  readRedirectLines,
  setRuleBlocks,
  sourceOf,
  writeRedirectLines,
} from './lib/redirects-file.ts';

/** Which product a shared path belongs to; the old root domains, oldest first. */
const PRIORITY = ['hive', 'codegen', 'yoga-server', 'envelop', 'mesh', 'inspector'];
const FAMILIES = ['docs', 'tutorial', 'v1', 'v2', 'v3', 'v4', 'v5'];
/** A directory owned by one product gets a wildcard once it has this many pages. */
const WILDCARD_FROM = 8;

const served = readdirSync(`${DIST}/graphql`, { withFileTypes: true })
  .filter(entry => entry.isDirectory())
  .map(entry => entry.name);
const products = [
  ...PRIORITY.filter(slug => served.includes(slug)),
  ...served.filter(slug => !PRIORITY.includes(slug)).sort(),
];

/** Every page under /graphql/<slug>/<family>, as paths relative to the family. */
function pagesOf(slug: string, family: string): string[] {
  const root = `${DIST}/graphql/${slug}/${family}`;
  const pages: string[] = [];
  if (existsSync(`${root}.html`)) pages.push('');
  if (!existsSync(root)) return pages;
  for (const file of readdirSync(root, { recursive: true, withFileTypes: true })) {
    if (!file.isFile() || !file.name.endsWith('.html') || file.name === '404.html') continue;
    const relative = `${file.parentPath}/${file.name}`.slice(
      `${DIST}/graphql/${slug}/${family}`.length,
    );
    pages.push(publicPath(relative.slice(1)).replace(/^\/$/, ''));
  }
  return pages;
}

const rules: string[] = [];

for (const family of FAMILIES) {
  // path (relative to the family) -> the products that have that page, PRIORITY order.
  const owners = new Map<string, string[]>();
  for (const slug of products) {
    for (const page of pagesOf(slug, family)) owners.set(page, [...(owners.get(page) ?? []), slug]);
  }
  if (owners.size === 0) continue;
  const owner = new Map([...owners].map(([page, slugs]) => [page, slugs[0]!]));
  const staticRule = (path: string, slug: string) =>
    `/${family}${path} /graphql/${slug}/${family}${path} 301`;
  const wildcardRule = (prefix: string, slug: string) =>
    `/${family}${prefix}/* /graphql/${slug}/${family}${prefix}/:splat 301`;

  const plan = (prefix: string, paths: string[]) => {
    const byOwner = new Map<string, string[]>();
    for (const path of paths)
      byOwner.set(owner.get(path)!, [...(byOwner.get(owner.get(path)!) ?? []), path]);
    if (prefix) {
      const [dominant, dominantPaths] = [...byOwner.entries()].sort(
        (a, b) => b[1].length - a[1].length,
      )[0]!;
      if (dominantPaths.length >= WILDCARD_FROM) {
        // Static rules for the other owners' pages come first in the file, so
        // they win; the directory page itself stays with the dominant product
        // when it has one (its bare-parent rule is added at the end).
        for (const [slug, own] of byOwner) {
          if (slug === dominant) continue;
          for (const path of own) {
            if (path === prefix && owners.get(path)!.includes(dominant)) continue;
            rules.push(staticRule(path, slug));
          }
        }
        rules.push(wildcardRule(prefix, dominant));
        return;
      }
    }
    const groups = new Map<string, string[]>();
    // The directory page itself goes to whichever product has most of the
    // directory (e.g. /docs/api is graphql-tools', not a smaller product's).
    const dominant = [...byOwner.entries()].sort((a, b) => b[1].length - a[1].length)[0]?.[0];
    for (const path of paths) {
      const rest = path.slice(prefix.length).replace(/^\//, '');
      if (!rest) {
        const candidates = owners.get(path)!;
        rules.push(
          staticRule(path, dominant && candidates.includes(dominant) ? dominant : candidates[0]!),
        );
        continue;
      }
      const segment = rest.split('/')[0]!;
      groups.set(segment, [...(groups.get(segment) ?? []), path]);
    }
    for (const [segment, group] of groups) plan(`${prefix}/${segment}`, group);
  };
  plan('', [...owner.keys()]);
}

const lines = readRedirectLines();
const existing = new Set(lines.filter(isRule).map(sourceOf));
// A root path that is a real page here, or already redirected by hand, is left alone.
const fresh = rules.filter(rule => {
  const source = sourceOf(rule);
  return !existing.has(source) && !resolvesInDist(source);
});
setRuleBlocks(
  lines,
  'Legacy root paths of the old product sites',
  fresh,
  'scripts/generate-legacy-root-redirects.ts',
);
setRuleBlocks(
  lines,
  'Bare parents of wildcard rules',
  barePartnerRules(lines),
  'scripts/generate-legacy-root-redirects.ts',
);
const { staticCount, dynamicCount } = checkLimits(lines);
writeRedirectLines(lines);
console.log(
  `Legacy root redirects: ${fresh.filter(r => !/[*:]/.test(sourceOf(r))).length} static, ${fresh.filter(r => /[*:]/.test(sourceOf(r))).length} wildcard; _redirects now ${staticCount} static, ${dynamicCount} dynamic`,
);
