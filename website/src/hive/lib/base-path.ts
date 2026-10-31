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

/**
 * Absolute URL of a page image, the one way og:image and structured data
 * resolve it: absolute URLs stay, bundled assets (/_astro/...) are emitted at
 * the shared root of the unified site, and anything else is relative to the
 * site's mount, with or without the mount prefix already on it.
 */
export function absoluteImageUrl(
  path: string,
  site: { mountPath: string; url: string } = { mountPath: basePath, url: HIVE_SITE_URL },
): string {
  if (/^https?:\/\//.test(path)) return path;
  const mountRelative =
    site.mountPath && (path === site.mountPath || path.startsWith(`${site.mountPath}/`))
      ? path.slice(site.mountPath.length)
      : path;
  if (mountRelative.startsWith('/_astro/')) return `${SITE_ORIGIN}${mountRelative}`;
  return `${site.url}/${mountRelative.replace(/^\//, '')}`;
}
