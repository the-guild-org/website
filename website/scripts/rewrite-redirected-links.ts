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
 * Runs after every generate-redirects step and before the verify steps.
 */
import { globSync, readFileSync, writeFileSync } from 'node:fs';
import { SITE_ORIGIN } from '../src/hive/lib/base-path.ts';
import { DIST, readRedirects, resolvesInDist } from './lib/build-output.ts';

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

let rewritten = 0;
let pages = 0;
for (const file of globSync('**/*.html', { cwd: DIST })) {
  const html = readFileSync(`${DIST}/${file}`, 'utf8');
  const next = html.replace(/(<a\b[^>]*?\shref=")([^"]+)(")/g, (whole, start, href, end) => {
    const absolute = href.startsWith(`${SITE_ORIGIN}/`) || href === SITE_ORIGIN;
    const relativeHref = absolute ? href.slice(SITE_ORIGIN.length) || '/' : href;
    if (!relativeHref.startsWith('/') || relativeHref.startsWith('//')) return whole;
    const [, rawPath = '', query = '', hash = ''] =
      relativeHref.match(/^([^?#]*)(\?[^#]*)?(#.*)?$/) ?? [];
    // The path stays percent-encoded, like the _redirects sources it is
    // matched against; resolvesInDist decodes it once. A link that cannot be
    // decoded or looked up is left as it is.
    const path = rawPath.length > 1 ? rawPath.replace(/\/$/, '') : rawPath;
    let destination: string | null;
    try {
      decodeURI(path);
      destination = finalDestination(path);
    } catch {
      return whole;
    }
    if (!destination) return whole;
    rewritten++;
    if (/^https?:\/\//.test(destination)) return `${start}${destination}${end}`;
    const [destinationPath = '', destinationHash] = destination.split('#');
    const fragment = hash || (destinationHash !== undefined ? `#${destinationHash}` : '');
    return `${start}${absolute ? SITE_ORIGIN : ''}${encodeURI(safeDecode(destinationPath))}${query}${fragment}${end}`;
  });
  if (next !== html) {
    pages++;
    writeFileSync(`${DIST}/${file}`, next);
  }
}

console.log(`Pointed ${rewritten} links on ${pages} pages straight at their final page`);
