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

## Figures in the Docs

The Hive docs have a set of typed figures for the diagrams prose usually needs: a request path, a
rollout timeline, a feature comparison, a spec sheet, a tree, a few big numbers. They live in
`website/src/hive/components/mdx/graph` and are imported in MDX from `#mdx-shims/graph`. The look
follows [mdxcn](https://www.mdxcn.dev): a dashed monospace frame with `+` corners, the title drawn
as `[ TITLE ]`, one accent colour, and glyphs instead of SVG.

Every figure takes plain Markdown as its children, so the source stays readable on GitHub and in the
`.md` twin of each docs page. Bold marks the node or row to accent (or the step happening now),
italics mute it (or mark the step still ahead):

```mdx
import { GraphFlow, GraphTimeline } from '#mdx-shims/graph'

<GraphFlow title="Request path">

- Client → **`graphql.analysis`** → _HTTP request_ → Coprocessor → Client

</GraphFlow>

<GraphTimeline title="Rollout">

- Phase 1: measure
- **Phase 2: enforce**
- _Phase 3: tighten_

</GraphTimeline>
```

| Component       | Children                                                | Use it for                              |
| --------------- | ------------------------------------------------------- | --------------------------------------- |
| `GraphFlow`     | One list item per path, nodes split on `→`              | Pipelines, request paths, state changes |
| `GraphTimeline` | List items as `Date: label`                             | Dated or phased sequences               |
| `GraphSpec`     | List items as `Label: value`, or a two-column table     | Defaults, limits, a spec sheet          |
| `GraphCompare`  | A table; `✓`/`✘` cells become checks and dashes         | Options side by side                    |
| `GraphTree`     | A nested list, `label — meta` for notes                 | Files, processes, org charts            |
| `GraphStat`     | List items as `**value** label`                         | Two to four headline numbers            |
| `GraphRank`     | List items as `label: number`                           | Anything sorted highest first           |
| `GraphDiff`     | List items as `label: ±value`, a bold total after `---` | What was added, removed, kept           |
| `GraphCheck`    | A task list                                             | Punch lists                             |
| `Terminal`      | A fenced code block, `$` lines are commands             | A command and its output                |
| `Graph`         | Anything                                                | The bare frame                          |

Keep titles to one or two words, prefer one figure per section, and keep mermaid for diagrams with
branches or loops that a list cannot express.

## Linting and Formatting

```sh
pnpm lint     # eslint (includes MDX)
pnpm prettier # format everything
pnpm prettier:check
```
