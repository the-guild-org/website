/**
 * The site's origin for this build. Production by default; CI overrides it
 * with SITE_URL for pull-request preview deploys (see
 * .github/workflows/ci.yaml), so canonical/OG tags, sitemaps, JSON-LD, and
 * every product's base-path module resolve to the preview host instead of
 * always pointing at prod.
 *
 * Self-contained (no extensionless src imports): loaded by Astro and by
 * plain `node` postbuild scripts, which need explicit .ts extensions for
 * relative imports.
 */
// `||`, not `??`: CI sets SITE_URL to an empty string (not unset) for
// non-preview builds, which must still fall through to the prod default.
export const SITE_ORIGIN = process.env.SITE_URL || 'https://the-guild.dev';
