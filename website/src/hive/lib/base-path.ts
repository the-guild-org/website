/**
 * Prefixes a site-internal root-absolute path with the Hive site's mount
 * prefix. The Hive pages live under /graphql/hive of the unified site, and
 * shared helpers/content refer to Hive URLs root-relatively. No-op for
 * external URLs, anchors, and already-prefixed paths, so it is safe to apply
 * to any href/src value.
 */
export const SITE_ORIGIN = 'https://the-guild.dev';
export const basePath = '/graphql/hive';
/** Absolute URL of the Hive site's mount point. */
export const HIVE_SITE_URL = `${SITE_ORIGIN}${basePath}`;

export function withBase(path: string): string;
export function withBase(path: string | undefined): string | undefined;
export function withBase(path: string | undefined): string | undefined {
  if (!path || !basePath || !path.startsWith('/') || path.startsWith('//')) {
    return path;
  }
  // Any /graphql/<product> path is already mounted — the Codegen docs reuse
  // this chrome with pre-based hrefs, which must not be double-prefixed.
  if (path === '/graphql' || path.startsWith('/graphql/')) return path;
  // The bare site root gets no trailing slash — /graphql/hive/ 301s to
  // /graphql/hive, so emitting the slash would cost a hop on every click.
  if (path === '/') return basePath;
  return `${basePath}${path}`;
}
