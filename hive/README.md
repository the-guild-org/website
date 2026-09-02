# Hive Platform Docs

Hive Platform documentation site — https://the-guild.dev/graphql/hive

## Quick Start

```bash
bun install
bun dev
```

## Structure

- `packages/documentation-astro/` — the website (Astro), serving docs, blog, case studies, product updates, and landing pages
- `packages/documentation/` — shared MDX content, public assets, and redirect rules consumed by the site
- `packages/design-system/` — React components with Tailwind CSS v4
- `packages/search-api/` — Cloudflare Worker for search-related APIs

## Commands

```bash
bun build        # Build all packages
bun test         # Run tests
bun fix          # Lint and format
```

## Deployment

The site deploys as static assets on a Cloudflare Worker. In production it is
mounted behind the the-guild.dev router under `/graphql/hive` — main-branch
builds set `ASTRO_BASE_PATH` accordingly, while PR previews run standalone.

## Tech

- Bun + Turborepo
- Astro + Tailwind CSS v4
- pagefind search
- Mermaid rendered at build time (rehype-mermaid via Playwright)
