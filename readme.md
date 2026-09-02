# [`the-guild.dev`](https://the-guild.dev)

The source code for The Guild's website and its edge infrastructure.

## Repository Layout

- [`website/`](./website) — the website, built with [Astro](https://astro.build). Deployed to
  Cloudflare Pages on every push to `master` (pull requests get preview deployments). This one
  project also contains the [Hive](https://the-guild.dev/graphql/hive) site (docs, blog, product
  updates, originally vendored from [`graphql-hive/docs`](https://github.com/graphql-hive/docs)):
  its implementation and content live in [`website/src/hive/`](./website/src/hive), its routes in
  [`website/src/pages/graphql/hive/`](./website/src/pages/graphql/hive), so the whole domain builds
  and ships as one Cloudflare Pages deployment.
- [`packages/website-router/`](./packages/website-router) — the Cloudflare Worker that serves
  `the-guild.dev`: it routes product-site paths (such as `/graphql/yoga-server`) to their own
  deployments, handles redirects, and merges the product sitemaps into one.
- [`packages/website-helper-worker/`](./packages/website-helper-worker) — the Worker behind
  `utils.the-guild.dev` (contact form, newsletter subscription).

## Development

```sh
pnpm install # from the repository root
cd website
pnpm dev # http://localhost:4321
```

`pnpm dev` serves the whole site, including the Hive pages under `/graphql/hive`. `pnpm build` in
`website/` runs `astro check`, builds the static site into `dist/`, and finishes with the Hive
post-build steps (sitemap, redirects, headers, search index — see
[`website/scripts/hive/`](./website/scripts/hive)).

## Contributing to the Blog

Posts live in [`website/src/content/blog/`](./website/src/content/blog) as MDX files:

- Add a new `.mdx` file (or a folder with an `index.mdx` for posts with colocated assets), following
  the frontmatter of the existing posts: `title`, `tags`, `authors`, `date`, `description`, and
  optionally `image` for the social preview.
- Larger assets go in `website/public/blog-assets/<your-post-slug>/`.
- First-time authors: add yourself to
  [`website/src/components/blog-authors.ts`](./website/src/components/blog-authors.ts).
- Open a pull request; the preview deployment lets you review the rendered post.

The blog index also pulls in the [Hive blog](https://the-guild.dev/graphql/hive/blog) feed at build
time, and a snapshot of the Stellate blog from `website/src/lib/stellate-blog.json`.

## Linting and Formatting

```sh
pnpm lint     # eslint (includes MDX)
pnpm prettier # format everything
pnpm prettier:check
```
