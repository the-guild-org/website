# Hive Platform Docs

Hive Platform documentation site — https://the-guild.dev/graphql/hive

This tree holds everything Hive-specific of the unified the-guild.dev website.
The pages themselves live in `src/pages/graphql/hive/`, so the whole site —
main pages and Hive docs — builds and serves from one Astro project:

```bash
pnpm install
pnpm dev        # from the website/ folder; Hive pages at /graphql/hive
```

## Structure

- `components/`, `layouts/`, `lib/`, `markdown/`, `mdx-shims/`, `styles/` —
  the site implementation (Astro components, markdown pipeline, shims that
  stand in for the original repo's React components)
- `documentation/` — shared MDX content, source assets, and redirect rules
- `design-system/` — Tailwind sources and `style.css` scanned/imported by
  `styles/global.css` (components are shimmed in `mdx-shims/`)
- `../pages/graphql/hive/` — the routes
- `../../scripts/hive/` — post-build steps (sitemap, redirects, headers,
  pagefind index, base-path verification)
- `../../public/graphql/hive/` — static assets served under the mount prefix

## URL shape

Hive pages are mounted at `/graphql/hive`. There is no Astro `base` — the
prefix comes from the page paths, `lib/base-path.ts` (`withBase`) for
component URLs, and `markdown/remark-base-path.mjs` for content links.
`scripts/hive/verify-base-path.ts` fails the build if an un-prefixed URL
slips through.

## Tech

- Astro + Tailwind CSS v4 (sources scoped per site in each `global.css`)
- pagefind search (indexed post-build over `dist/graphql/hive`)
- Mermaid rendered at build time (rehype-mermaid via Playwright)
