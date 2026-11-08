/**
 * Points every internal link straight at its final page (Ahrefs site audit,
 * October 2026: 2,273 of ~2,300 pages linked to a redirect, 642 distinct
 * URLs). Most of those links come from content this repo does not own —
 * TypeDoc output of graphql-tools/graphql-ws/graphql-sse linking to the old
 * root /docs/..., product navs linking to /docs (which redirects to its first
 * page), docs linking to blog posts that moved to the Hive blog — so they are
 * rewritten in the built HTML, once _redirects is final.
 *
 * A link is rewritten only when following the rules (up to five hops) ends on
 * a page in this build or on another site; a path that is itself a page is
 * never touched. The fragment of the original link wins over the rule's.
 * Relative links are resolved against the page like a browser does (the
 * November crawl found docs linking `usage` or `di/introduction` from a page
 * whose URL has no trailing slash), and www, http and trailing-slash forms of
 * our own URLs, which each cost a redirect hop, are made canonical.
 * Runs after every generate-redirects step and before the verify steps.
 */
import { globSync, readFileSync, writeFileSync } from 'node:fs';
import { SITE_ORIGIN } from '../src/hive/lib/base-path.ts';
import { ROUTER_SERVED_PAGES } from '../src/lib/router-pages.ts';
import { DIST, publicPath, readRedirects, resolvesInDist } from './lib/build-output.ts';

const rules = readRedirects();
const exact = new Map(
  rules.filter(rule => !/[*:]/.test(rule.source)).map(rule => [rule.source, rule.destination]),
);
const dynamic = rules
  .filter(rule => /[*:]/.test(rule.source))
  .map(rule => {
    const names: string[] = [];
    const pattern = rule.source
      .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
      .replace(/\*/g, () => {
        names.push('splat');
        return '(.*)';
      })
      .replace(/:([A-Za-z_]+)/g, (_, name: string) => {
        names.push(name);
        return '([^/]+)';
      });
    return { destination: rule.destination, names, regex: new RegExp(`^${pattern}$`) };
  });

/** The destination of the rule that matches `path`, as Pages would apply it. */
function redirectOf(path: string): string | undefined {
  const fixed = exact.get(path);
  if (fixed) return fixed;
  for (const { destination, names, regex } of dynamic) {
    const match = path.match(regex);
    if (!match) continue;
    return names.reduce(
      (target, name, index) => target.replaceAll(`:${name}`, match[index + 1] ?? ''),
      destination,
    );
  }
}

const cache = new Map<string, string | null>();
/** Final destination of a redirecting internal path, or null when it should stay as is. */
function finalDestination(path: string): string | null {
  if (cache.has(path)) return cache.get(path)!;
  let result: string | null = null;
  if (!resolvesInDist(path)) {
    let current = path;
    let hash = '';
    for (let hop = 0; hop < 5; hop++) {
      const next = redirectOf(current);
      if (!next) break;
      const [target = '', fragment] = next.split('#');
      if (fragment !== undefined) hash = `#${fragment}`;
      if (/^https?:\/\//.test(target) && !target.startsWith(`${SITE_ORIGIN}/`)) {
        result = target + hash;
        break;
      }
      current = target.startsWith(SITE_ORIGIN) ? target.slice(SITE_ORIGIN.length) || '/' : target;
      if (resolvesInDist(current)) {
        result = current + hash;
        break;
      }
    }
  }
  cache.set(path, result);
  return result;
}

/** Destinations in _redirects may already be percent-encoded. */
function safeDecode(path: string): string {
  try {
    return decodeURI(path);
  } catch {
    return path;
  }
}

/** Our own site, written with or without www, https or a default port. */
const SITE_HOST = /^(?:https?:)?\/\/(?:www\.)?the-guild\.dev(?::(?:443|80))?(?=[/?#]|$)/i;
const ANY_SCHEME = /^[a-z][a-z\d+.-]*:/i;

const counts = { redirect: 0, host: 0, slash: 0 };

/**
 * The href a link should have, or null to keep it. Links are resolved the
 * way a browser resolves them on `pageUrl`: relative ones against the page,
 * www and http forms of this site as internal. A link that reaches a page
 * through a redirect points at that page; one that only needs its trailing
 * slash dropped or its host made canonical gets that. Links that already
 * work, and links to other sites, are left as they are.
 */
function rewriteHref(href: string, pageUrl: string): string | null {
  if (href.startsWith('#')) return null;
  const onSiteHost = SITE_HOST.test(href);
  if (!onSiteHost && (ANY_SCHEME.test(href) || href.startsWith('//'))) return null;
  const absolute = onSiteHost;
  const canonicalHost = href.startsWith(`${SITE_ORIGIN}/`) || href === SITE_ORIGIN;
  let url: URL;
  try {
    url = new URL(href, pageUrl);
  } catch {
    return null;
  }
  const rawPath = url.pathname;
  const hadTrailingSlash = rawPath.length > 1 && rawPath.endsWith('/');
  // The path stays percent-encoded, like the _redirects sources it is
  // matched against; resolvesInDist decodes it once. A link that cannot be
  // decoded or looked up is left as it is.
  const path = hadTrailingSlash ? rawPath.replace(/\/+$/, '') : rawPath;
  let destination: string | null;
  try {
    decodeURI(path);
    destination = finalDestination(path);
    if (!destination && (hadTrailingSlash || (onSiteHost && !canonicalHost))) {
      if (!resolvesInDist(path) && !ROUTER_SERVED_PAGES.includes(path)) return null;
      counts[hadTrailingSlash ? 'slash' : 'host']++;
      return `${absolute ? SITE_ORIGIN : ''}${path}${url.search}${url.hash}`;
    }
  } catch {
    return null;
  }
  if (!destination) return null;
  counts.redirect++;
  if (/^https?:\/\//.test(destination)) return destination;
  const [destinationPath = '', destinationHash] = destination.split('#');
  const fragment = url.hash || (destinationHash !== undefined ? `#${destinationHash}` : '');
  return `${absolute ? SITE_ORIGIN : ''}${encodeURI(safeDecode(destinationPath))}${url.search}${fragment}`;
}

let pages = 0;
for (const file of globSync('**/*.html', { cwd: DIST })) {
  const html = readFileSync(`${DIST}/${file}`, 'utf8');
  const pageUrl = `${SITE_ORIGIN}${publicPath(file)}`;
  const next = html.replace(/(<a\b[^>]*?\shref=")([^"]+)(")/g, (whole, start, href, end) => {
    const rewritten = rewriteHref(href, pageUrl);
    return rewritten === null ? whole : `${start}${rewritten}${end}`;
  });
  if (next !== html) {
    pages++;
    writeFileSync(`${DIST}/${file}`, next);
  }
}

console.log(
  `Rewrote links on ${pages} pages: ${counts.redirect} pointed past a redirect, ` +
    `${counts.slash} without a trailing slash, ${counts.host} to https://the-guild.dev`,
);
