// Self-contained (no extensionless src imports): this module is loaded both
// by Astro and by plain `node` postbuild scripts, which need explicit .ts
// extensions for relative imports.
export const SITE_ORIGIN = 'https://the-guild.dev';
export const basePath = '/graphql/codegen';
export const CODEGEN_SITE_URL = `${SITE_ORIGIN}${basePath}`;

/** Prefix a root-relative path with the codegen mount point. */
export function withBase(path: string): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  if (path === '/graphql' || path.startsWith('/graphql/')) return path;
  if (path === '/') return basePath;
  return `${basePath}${path}`;
}
