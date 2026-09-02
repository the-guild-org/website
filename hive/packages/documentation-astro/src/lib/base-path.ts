/**
 * Prefixes a site-internal root-absolute path with the configured Astro base
 * (see `base` in astro.config.mjs). No-op for external URLs, anchors, and
 * already-prefixed paths, so it is safe to apply to any href/src value.
 */
/** The normalized base path — an empty string when served at the root. */
export const basePath = import.meta.env.BASE_URL.replace(/\/+$/, "");

export function withBase(path: string): string;
export function withBase(path: string | undefined): string | undefined;
export function withBase(path: string | undefined): string | undefined {
  if (!path || !basePath || !path.startsWith("/") || path.startsWith("//")) {
    return path;
  }
  if (path === basePath || path.startsWith(`${basePath}/`)) return path;
  // The bare site root gets no trailing slash — /graphql/hive/ 301s to
  // /graphql/hive, so emitting the slash would cost a hop on every click.
  if (path === "/") return basePath;
  return `${basePath}${path}`;
}
