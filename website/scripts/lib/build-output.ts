/**
 * Shared helpers for the postbuild scripts: one definition of where the
 * build output lives and how public URLs map onto it, instead of six
 * scripts re-deriving paths, parsing sitemaps and reading _redirects in
 * subtly different ways.
 */
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { basePath, SITE_ORIGIN } from '../../src/hive/lib/base-path.ts';

export const PROJECT_DIR = fileURLToPath(new URL('../..', import.meta.url));
export const DIST = fileURLToPath(new URL('../../dist', import.meta.url));
export const HIVE_DIST = `${DIST}${basePath}`;
export const REPO_ROOT = fileURLToPath(new URL('../../..', import.meta.url));

export const SITEMAPS = [
  '/sitemap-0.xml',
  `${basePath}/sitemap.xml`,
  '/graphql/codegen/sitemap.xml',
];

/** Public URL path served by a dist html file (build.format: "file"). */
export function publicPath(relativePath: string): string {
  if (relativePath === 'index.html') return '/';
  return `/${relativePath.replace(/\/index\.html$/, '').replace(/\.html$/, '')}`;
}

/** Whether an internal path resolves to a file in dist. */
export function resolvesInDist(pathname: string): boolean {
  const decoded = decodeURI(pathname);
  return [
    `${DIST}${decoded}`,
    `${DIST}${decoded}.html`,
    `${DIST}${decoded}/index.html`,
    ...(decoded === '/' ? [`${DIST}/index.html`] : []),
  ].some(candidate => existsSync(candidate));
}

/** Every <loc> pathname across the generated sitemaps. */
export function readSitemapPaths(): Set<string> {
  const paths = new Set<string>();
  for (const sitemap of SITEMAPS) {
    const file = `${DIST}${sitemap}`;
    if (!existsSync(file)) continue;
    for (const [, loc] of readFileSync(file, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)) {
      if (!loc.startsWith(SITE_ORIGIN)) continue;
      paths.add(decodeURI(loc.slice(SITE_ORIGIN.length)) || '/');
    }
  }
  return paths;
}

export interface RedirectRule {
  source: string;
  destination: string;
  status: string | undefined;
}

/** Parsed rules from dist/_redirects (comments and blanks skipped). */
export function readRedirects(): RedirectRule[] {
  const file = `${DIST}/_redirects`;
  if (!existsSync(file)) return [];
  const rules: RedirectRule[] = [];
  for (const line of readFileSync(file, 'utf8').split('\n')) {
    if (!line.trim() || line.startsWith('#')) continue;
    const [source, destination, status] = line.trim().split(/\s+/);
    if (source && destination) rules.push({ source, destination, status });
  }
  return rules;
}
