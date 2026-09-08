import { createReadStream, existsSync, readdirSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import { markdownConfigDefaults, rehypeShiki, unified } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import { transformerMetaHighlight } from '@shikijs/transformers';
import tailwindcss from '@tailwindcss/vite';
import {
  DOCS_CODE_LANGS,
  DOCS_CODE_THEMES,
} from './src/hive/documentation/src/lib/docs-code-config.ts';
import { rehypeCode, rehypeCodeDefaultOptions } from './src/hive/markdown/rehype-code.mjs';
import { mermaidRehypePlugin } from './src/hive/markdown/rehype-mermaid-config.mjs';
import { remarkBasePath } from './src/hive/markdown/remark-base-path.mjs';
import { remarkNpm2Yarn } from './src/hive/markdown/remark-npm2yarn.mjs';
import { remarkRelativeLinks } from './src/hive/markdown/remark-relative-links.mjs';
import { remarkTocMarkers } from './src/hive/markdown/remark-toc-markers.mjs';

const codegenContentDir = fileURLToPath(new URL('./src/codegen/content', import.meta.url));
/** Codegen content collections for relative-link resolution. */
const codegenLinkOptions = {
  collections: [{ base: '/plugins', directory: join(codegenContentDir, 'plugins') }],
  fallback: { base: '/docs', directory: join(codegenContentDir, 'docs') },
};

/**
 * The project hosts two visually independent sites in one Astro build: the
 * main the-guild.dev pages, and the Hive docs site under /graphql/hive
 * (sources in src/hive, pages in src/pages/graphql/hive). Each keeps its own
 * markdown pipeline: the wrappers below run a plugin only for files on the
 * matching side, keyed on whether the file lives in src/hive.
 */
const isHiveFile = path => typeof path === 'string' && path.includes('/src/hive/');
const isCodegenFile = path => typeof path === 'string' && path.includes('/src/codegen/');
const isYogaFile = path => typeof path === 'string' && path.includes('/src/yoga/');
const isEnvelopFile = path => typeof path === 'string' && path.includes('/src/envelop/');
const isInspectorFile = path => typeof path === 'string' && path.includes('/src/inspector/');

const inspectorContentDir = fileURLToPath(new URL('./src/inspector/content', import.meta.url));
/** Inspector content: a single docs section. */
const inspectorLinkOptions = {
  collections: [],
  fallback: { base: '/docs', directory: join(inspectorContentDir, 'docs') },
};
const isProductFile = path => typeof path === 'string' && path.includes('/src/products/');
/** The registry products (src/products/<slug>/product.ts), for per-product plugin scoping. */
const productsDir = fileURLToPath(new URL('./src/products', import.meta.url));
const products = readdirSync(productsDir, { withFileTypes: true })
  .filter(entry => entry.isDirectory() && existsSync(join(productsDir, entry.name, 'product.ts')))
  .map(entry => entry.name)
  .sort();
const isProductSlugFile = slug => path =>
  typeof path === 'string' && path.includes(`/src/products/${slug}/`);
const productLinkOptions = slug => ({
  collections: [],
  fallback: { base: '', directory: join(productsDir, slug, 'content') },
});

const envelopContentDir = fileURLToPath(new URL('./src/envelop/content', import.meta.url));
/** Envelop content collections for relative-link resolution (v4 is current, v2/v3 under /v<n>). */
const envelopLinkOptions = {
  collections: ['v2', 'v3'].map(version => ({
    base: `/${version}`,
    directory: join(envelopContentDir, version),
  })),
  fallback: { base: '/docs', directory: join(envelopContentDir, 'docs') },
};
const isMeshFile = path => typeof path === 'string' && path.includes('/src/mesh/');

const meshContentDir = fileURLToPath(new URL('./src/mesh/content', import.meta.url));
/** Mesh content collections for relative-link resolution (v1 is current, v0 under /docs). */
const meshLinkOptions = {
  collections: [{ base: '/docs', directory: join(meshContentDir, 'docs') }],
  fallback: { base: '/v1', directory: join(meshContentDir, 'v1') },
};

const yogaContentDir = fileURLToPath(new URL('./src/yoga/content', import.meta.url));
/** Yoga content collections for relative-link resolution. */
const yogaLinkOptions = {
  collections: ['tutorial', 'v2', 'v3', 'v4', 'changelogs'].map(section => ({
    base: `/${section}`,
    directory: join(yogaContentDir, section),
  })),
  fallback: { base: '/docs', directory: join(yogaContentDir, 'docs') },
};

function scoped(test, plugin, ...pluginArgs) {
  return function () {
    const transformer = plugin.apply(this, pluginArgs);
    if (typeof transformer !== 'function') return transformer;
    return function (tree, file, ...rest) {
      const filePath = file?.path ?? file?.history?.[0];
      if (!test(filePath)) {
        const done = rest[0];
        return typeof done === 'function' ? done() : undefined;
      }
      return transformer.call(this, tree, file, ...rest);
    };
  };
}

/** Runs only on Hive files (skips files without a path). */
const hiveOnly = (plugin, ...args) => scoped(isHiveFile, plugin, ...args);
/** Runs only on Codegen files (content fetched into src/codegen). */
const codegenOnly = (plugin, ...args) => scoped(isCodegenFile, plugin, ...args);
/** Runs only on Yoga files (content fetched into src/yoga). */
const yogaOnly = (plugin, ...args) => scoped(isYogaFile, plugin, ...args);
/** Runs only on Envelop files (content fetched into src/envelop). */
const envelopOnly = (plugin, ...args) => scoped(isEnvelopFile, plugin, ...args);
/** Runs only on Inspector files (content fetched into src/inspector). */
const inspectorOnly = (plugin, ...args) => scoped(isInspectorFile, plugin, ...args);
/** Runs only on Mesh files (content fetched into src/mesh). */
const meshOnly = (plugin, ...args) => scoped(isMeshFile, plugin, ...args);
/** Runs on everything except docs-product files (including files without a path). */
const mainOnly = (plugin, ...args) =>
  scoped(
    path =>
      !isHiveFile(path) &&
      !isCodegenFile(path) &&
      !isYogaFile(path) &&
      !isEnvelopFile(path) &&
      !isInspectorFile(path) &&
      !isMeshFile(path) &&
      !isProductFile(path),
    plugin,
    ...args,
  );

/**
 * The main site's MDX uses Astro's default syntax highlighting. The shared
 * processor disables the built-in pass (the Hive side brings its own shiki
 * pipeline), so the default is re-applied here — same plugin, same default
 * config, scoped to main-site files.
 */
const defaultSyntaxHighlight = markdownConfigDefaults.syntaxHighlight;
const defaultShiki = mainOnly(
  rehypeShiki,
  {
    ...markdownConfigDefaults.shikiConfig,
    // The mdx grammar embeds source.tsx lazily: it only produces granular
    // tokens when the tsx grammar is already registered. Preload it so
    // ```mdx fences highlight deterministically (Astro's built-in pass got
    // it by accumulation across files sharing one highlighter).
    langs: ['tsx'],
  },
  typeof defaultSyntaxHighlight === 'object' ? defaultSyntaxHighlight.excludeLangs : undefined,
);

/**
 * The docs search runs on a static Pagefind bundle that `pnpm build`
 * generates into dist/graphql/hive/pagefind. The dev server has no such
 * step, so serve the bundle from the last build — search works in dev after
 * one `pnpm build`, and the page degrades gracefully (open does nothing)
 * before that.
 */
function pagefindDevServer(mount = '/graphql/hive/pagefind') {
  const bundleDirectory = fileURLToPath(new URL(`./dist${mount}`, import.meta.url));
  const contentTypes = {
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.wasm': 'application/wasm',
  };
  let warned = false;
  return {
    name: `pagefind-dev-server-${mount.split('/').at(-2)}`,
    hooks: {
      'astro:server:setup': ({ server }) => {
        server.middlewares.use(mount, (request, response, next) => {
          // request.url can carry a cache-busting query string (?ts=...).
          const path = (request.url ?? '/').split('?')[0];
          const file = join(bundleDirectory, normalize(path).replace(/^(\.\.\/?)+/, ''));
          if (!file.startsWith(bundleDirectory) || !existsSync(file)) {
            if (!warned && !existsSync(bundleDirectory)) {
              warned = true;
              console.warn(
                '\n[pagefind] No search bundle found — run `pnpm build` once to generate the search index for dev.\n',
              );
            }
            return next();
          }
          response.setHeader(
            'Content-Type',
            contentTypes[extname(file)] ?? 'application/octet-stream',
          );
          createReadStream(file).pipe(response);
        });
      },
    },
  };
}

export default defineConfig({
  site: 'https://the-guild.dev',
  // Prefetch pages on link hover: navigation across the docs feels instant
  // and the fetch is only triggered by intent (no blanket preloading).
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  /**
   * Plain .md content (all of it on the Hive side) is rendered by Astro's
   * built-in markdown pipeline, so the Hive link plugins must be registered
   * here as well.
   */
  markdown: {
    processor: unified({
      remarkPlugins: [
        hiveOnly(remarkRelativeLinks),
        hiveOnly(remarkBasePath),
        hiveOnly(remarkTocMarkers),
      ],
    }),
  },
  integrations: [
    pagefindDevServer(),
    pagefindDevServer('/graphql/codegen/pagefind'),
    pagefindDevServer('/graphql/yoga-server/pagefind'),
    pagefindDevServer('/graphql/envelop/pagefind'),
    pagefindDevServer('/graphql/inspector/pagefind'),
    ...products.map(slug => pagefindDevServer(`/graphql/${slug}/pagefind`)),
    pagefindDevServer('/graphql/mesh/pagefind'),
    mdx({
      processor: unified({
        remarkPlugins: [
          hiveOnly(remarkNpm2Yarn),
          hiveOnly(remarkRelativeLinks),
          hiveOnly(remarkBasePath),
          hiveOnly(remarkTocMarkers),
          codegenOnly(remarkNpm2Yarn),
          codegenOnly(remarkRelativeLinks, codegenLinkOptions),
          codegenOnly(remarkBasePath, { base: '/graphql/codegen' }),
          codegenOnly(remarkTocMarkers),
          yogaOnly(remarkNpm2Yarn),
          yogaOnly(remarkRelativeLinks, yogaLinkOptions),
          yogaOnly(remarkBasePath, { base: '/graphql/yoga-server' }),
          yogaOnly(remarkTocMarkers),
          envelopOnly(remarkNpm2Yarn),
          envelopOnly(remarkRelativeLinks, envelopLinkOptions),
          envelopOnly(remarkBasePath, { base: '/graphql/envelop' }),
          envelopOnly(remarkTocMarkers),
          inspectorOnly(remarkNpm2Yarn),
          inspectorOnly(remarkRelativeLinks, inspectorLinkOptions),
          inspectorOnly(remarkBasePath, { base: '/graphql/inspector' }),
          inspectorOnly(remarkTocMarkers),
          ...products.flatMap(slug => [
            scoped(isProductSlugFile(slug), remarkNpm2Yarn),
            scoped(isProductSlugFile(slug), remarkRelativeLinks, productLinkOptions(slug)),
            scoped(isProductSlugFile(slug), remarkBasePath, { base: `/graphql/${slug}` }),
            scoped(isProductSlugFile(slug), remarkTocMarkers),
          ]),
          meshOnly(remarkNpm2Yarn),
          meshOnly(remarkRelativeLinks, meshLinkOptions),
          meshOnly(remarkBasePath, { base: '/graphql/mesh' }),
          meshOnly(remarkTocMarkers),
        ],
        rehypePlugins: [
          defaultShiki,
          hiveOnly(...mermaidRehypePlugin),
          hiveOnly(rehypeCode, {
            langs: [...DOCS_CODE_LANGS],
            themes: DOCS_CODE_THEMES,
            transformers: rehypeCodeDefaultOptions.transformers,
          }),
          codegenOnly(rehypeCode, {
            langs: [...DOCS_CODE_LANGS],
            themes: DOCS_CODE_THEMES,
            // Nextra highlights lines with `{1,3-5}` fence meta; the meta
            // transformer emits the same class as the notation one.
            transformers: [...rehypeCodeDefaultOptions.transformers, transformerMetaHighlight()],
          }),
          yogaOnly(...mermaidRehypePlugin),
          yogaOnly(rehypeCode, {
            langs: [...DOCS_CODE_LANGS],
            themes: DOCS_CODE_THEMES,
            transformers: [...rehypeCodeDefaultOptions.transformers, transformerMetaHighlight()],
          }),
          envelopOnly(rehypeCode, {
            langs: [...DOCS_CODE_LANGS],
            themes: DOCS_CODE_THEMES,
            transformers: [...rehypeCodeDefaultOptions.transformers, transformerMetaHighlight()],
          }),
          inspectorOnly(rehypeCode, {
            langs: [...DOCS_CODE_LANGS],
            themes: DOCS_CODE_THEMES,
            transformers: [...rehypeCodeDefaultOptions.transformers, transformerMetaHighlight()],
          }),
          meshOnly(...mermaidRehypePlugin),
          meshOnly(rehypeCode, {
            langs: [...DOCS_CODE_LANGS],
            themes: DOCS_CODE_THEMES,
            transformers: [...rehypeCodeDefaultOptions.transformers, transformerMetaHighlight()],
          }),
          // The registry products share one code-block setup.
          scoped(isProductFile, rehypeCode, {
            langs: [...DOCS_CODE_LANGS],
            themes: DOCS_CODE_THEMES,
            transformers: [...rehypeCodeDefaultOptions.transformers, transformerMetaHighlight()],
          }),
        ],
      }),
      syntaxHighlight: false,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      // The design-system sources are never imported — their components are
      // all shimmed (see resolve.alias below) and their React dependencies
      // are not installed; the files exist for Tailwind class scanning and
      // as asset sources. Keep the dev-server dependency scanner off them.
      entries: ['src/**/*.{astro,js,jsx,ts,tsx,md,mdx,mjs,html}', '!src/hive/design-system/**'],
    },
    resolve: {
      alias: [
        // The Hive content MDX imports its components through the
        // @hive/design-system and #-prefixed specifiers of the original
        // repo; they all resolve to the Astro shims in src/hive/mdx-shims.
        alias('@hive/design-system/hive-components/callout', './src/hive/mdx-shims/callout.ts'),
        alias('@hive/design-system/tabs', './src/hive/mdx-shims/tabs.ts'),
        alias('@hive/design-system/image', './src/hive/mdx-shims/image.ts'),
        alias('@hive/design-system/hive-components/card', './src/hive/mdx-shims/card.ts'),
        alias(
          '@hive/design-system/hive-components/screenshot',
          './src/hive/mdx-shims/screenshot.ts',
        ),
        alias('@hive/design-system/call-to-action', './src/hive/mdx-shims/call-to-action.ts'),
        alias('@hive/design-system/contact-us', './src/hive/mdx-shims/contact-us.ts'),
        alias('@hive/design-system/mdx-components/mdx-video', './src/hive/mdx-shims/video.ts'),
        alias('@hive/design-system/youtube-iframe', './src/hive/mdx-shims/youtube-iframe.ts'),
        alias(
          '@hive/design-system/hive-components/cli-errors',
          './src/hive/mdx-shims/cli-errors.ts',
        ),
        alias(
          '@hive/design-system/hive-components/stack-blitz',
          './src/hive/mdx-shims/stack-blitz.ts',
        ),
        alias(
          '@hive/design-system/hive-components/code-sandbox',
          './src/hive/mdx-shims/code-sandbox.ts',
        ),
        alias('@hive/design-system/hive-components/link-card', './src/hive/mdx-shims/link-card.ts'),
        alias(
          '@hive/design-system/hive-components/comparison',
          './src/hive/mdx-shims/comparison.ts',
        ),
        alias('#mdx-shims/steps', './src/hive/mdx-shims/steps.ts'),
        alias('#mdx-shims/files', './src/hive/mdx-shims/files.ts'),
        alias('#mdx-shims/callout', './src/hive/mdx-shims/callout.ts'),
        alias(
          '#components/otel-metrics/metrics-section',
          './src/hive/mdx-shims/metrics-section.ts',
        ),
        alias('#components/large-callout', './src/hive/mdx-shims/large-callout.ts'),
        alias('#components/lede', './src/hive/mdx-shims/lede.ts'),
        alias('#components/small-avatar', './src/hive/mdx-shims/small-avatar.ts'),
        alias('@/components/deployment-changelog', './src/hive/mdx-shims/changelog.ts'),
        alias('virtual:deployment-changelog-toc', './src/hive/mdx-shims/changelog-toc.ts'),
        {
          find: /.*\/src\/components\/arrow-icon\.tsx$/,
          replacement: fileURLToPath(
            new URL('./src/hive/mdx-shims/arrow-icon.ts', import.meta.url),
          ),
        },
        {
          find: /.*\/src\/components\/blog\/welcome-hive-router-components(\.tsx)?$/,
          replacement: fileURLToPath(
            new URL('./src/hive/mdx-shims/welcome-hive-router-components.ts', import.meta.url),
          ),
        },
        {
          find: /.*\/src\/components\/blog\/welcome-hive-router-zero-copy-json(\.tsx)?$/,
          replacement: fileURLToPath(
            new URL('./src/hive/mdx-shims/welcome-hive-router-zero-copy-json.ts', import.meta.url),
          ),
        },
      ],
    },
  },
  // The website-router worker redirects trailing-slash URLs to their
  // slashless form. Directory-style output makes Cloudflare Pages redirect
  // the other way (/blog -> /blog/), causing an infinite 308 loop — so
  // emit file-style output (blog.html) and slashless URLs everywhere.
  build: { format: 'file' },
  trailingSlash: 'never',
});

function alias(find, path) {
  return { find, replacement: fileURLToPath(new URL(path, import.meta.url)) };
}
