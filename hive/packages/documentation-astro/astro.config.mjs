import mdx from "@astrojs/mdx";
import { unified } from "@astrojs/markdown-remark";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import {
  rehypeCode,
  rehypeCodeDefaultOptions,
} from "fumadocs-core/mdx-plugins";
import { fileURLToPath } from "node:url";

import {
  DOCS_CODE_LANGS,
  DOCS_CODE_THEMES,
} from "../documentation/src/lib/docs-code-config.ts";
import { mermaidRehypePlugin } from "./src/markdown/rehype-mermaid-config.mjs";
import { remarkBasePath } from "./src/markdown/remark-base-path.mjs";
import { remarkNpm2Yarn } from "./src/markdown/remark-npm2yarn.mjs";
import { remarkRelativeLinks } from "./src/markdown/remark-relative-links.mjs";
import { remarkTocMarkers } from "./src/markdown/remark-toc-markers.mjs";

export default defineConfig({
  /**
   * Behind the the-guild.dev router the site is mounted under a path prefix
   * (e.g. /graphql/hive) which the router strips before proxying — the worker
   * serves un-prefixed paths, but every URL the browser requests must carry
   * the prefix. Main deploys build with ASTRO_BASE_PATH set; PR previews run
   * standalone on workers.dev and build without it.
   */
  base: process.env.ASTRO_BASE_PATH || "/",
  /**
   * The merged the-guild.dev deployment serves this site from Cloudflare
   * Pages, whose directory-style output would 308 /path to /path/ while the
   * router strips trailing slashes (an infinite loop). File-style output
   * keeps the slash-less URL shape the site has always had.
   */
  build: { format: "file" },
  trailingSlash: "never",
  /**
   * Plain .md content (unlike .mdx) is rendered by Astro's built-in markdown
   * pipeline, so the link plugins must be registered here as well.
   */
  markdown: {
    remarkPlugins: [remarkRelativeLinks, remarkBasePath, remarkTocMarkers],
  },
  integrations: [
    mdx({
      processor: unified({
        // Keep this in sync with the Fumadocs pipeline so code-block metadata,
        // including filenames, has identical semantics in both sites.
        rehypePlugins: [
          mermaidRehypePlugin,
          [
            rehypeCode,
            {
              langs: [...DOCS_CODE_LANGS],
              tab: false,
              themes: DOCS_CODE_THEMES,
              transformers: rehypeCodeDefaultOptions.transformers,
            },
          ],
        ],
        remarkPlugins: [
          remarkNpm2Yarn,
          remarkRelativeLinks,
          remarkBasePath,
          remarkTocMarkers,
        ],
      }),
      syntaxHighlight: false,
    }),
  ],
  publicDir: fileURLToPath(new URL("../documentation/public", import.meta.url)),
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: [
        alias(
          "@hive/design-system/hive-components/callout",
          "./src/mdx-shims/callout.ts",
        ),
        alias("@hive/design-system/tabs", "./src/mdx-shims/tabs.ts"),
        alias("@hive/design-system/image", "./src/mdx-shims/image.ts"),
        alias(
          "@hive/design-system/hive-components/card",
          "./src/mdx-shims/card.ts",
        ),
        alias(
          "@hive/design-system/hive-components/screenshot",
          "./src/mdx-shims/screenshot.ts",
        ),
        alias(
          "@hive/design-system/call-to-action",
          "./src/mdx-shims/call-to-action.ts",
        ),
        alias(
          "@hive/design-system/contact-us",
          "./src/mdx-shims/contact-us.ts",
        ),
        alias(
          "@hive/design-system/mdx-components/mdx-video",
          "./src/mdx-shims/video.ts",
        ),
        alias(
          "@hive/design-system/youtube-iframe",
          "./src/mdx-shims/youtube-iframe.ts",
        ),
        alias(
          "@hive/design-system/hive-components/cli-errors",
          "./src/mdx-shims/cli-errors.ts",
        ),
        alias(
          "@hive/design-system/hive-components/stack-blitz",
          "./src/mdx-shims/stack-blitz.ts",
        ),
        alias(
          "@hive/design-system/hive-components/code-sandbox",
          "./src/mdx-shims/code-sandbox.ts",
        ),
        alias(
          "@hive/design-system/hive-components/link-card",
          "./src/mdx-shims/link-card.ts",
        ),
        alias(
          "@hive/design-system/hive-components/comparison",
          "./src/mdx-shims/comparison.ts",
        ),
        alias("fumadocs-ui/components/steps", "./src/mdx-shims/steps.ts"),
        alias("fumadocs-ui/components/files", "./src/mdx-shims/files.ts"),
        alias("fumadocs-ui/components/callout", "./src/mdx-shims/callout.ts"),
        alias(
          "#components/otel-metrics/metrics-section",
          "./src/mdx-shims/metrics-section.ts",
        ),
        alias("#components/large-callout", "./src/mdx-shims/large-callout.ts"),
        alias("#components/lede", "./src/mdx-shims/lede.ts"),
        alias("#components/small-avatar", "./src/mdx-shims/small-avatar.ts"),
        alias(
          "@/components/deployment-changelog",
          "./src/mdx-shims/changelog.ts",
        ),
        alias(
          "virtual:deployment-changelog-toc",
          "./src/mdx-shims/changelog-toc.ts",
        ),
        {
          find: /.*\/src\/components\/arrow-icon\.tsx$/,
          replacement: fileURLToPath(
            new URL("./src/mdx-shims/arrow-icon.ts", import.meta.url),
          ),
        },
        {
          find: /.*\/src\/components\/blog\/welcome-hive-router-components(\.tsx)?$/,
          replacement: fileURLToPath(
            new URL(
              "./src/mdx-shims/welcome-hive-router-components.ts",
              import.meta.url,
            ),
          ),
        },
        {
          find: /.*\/src\/components\/blog\/welcome-hive-router-zero-copy-json(\.tsx)?$/,
          replacement: fileURLToPath(
            new URL(
              "./src/mdx-shims/welcome-hive-router-zero-copy-json.ts",
              import.meta.url,
            ),
          ),
        },
      ],
    },
  },
});

function alias(find, path) {
  return {
    find,
    replacement: fileURLToPath(new URL(path, import.meta.url)),
  };
}
