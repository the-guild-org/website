import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { AUTHORS } from './components/blog-authors';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: ['**/*.mdx', '!**/_*/**'] }),
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    authors: z
      .array(z.string())
      .nonempty()
      .superRefine((ids, ctx) => {
        for (const id of ids) {
          if (!Object.hasOwn(AUTHORS, id)) {
            ctx.addIssue({ code: 'custom', message: `Unknown blog author "${id}"` });
          }
        }
      }),
    date: z.coerce.date(),
    updateDate: z.coerce.date().optional(),
    description: z.string(),
    image: z.string().optional(),
    thumbnail: z.string().optional(),
  }),
});

// --- Hive documentation site (served under /graphql/hive) ---

const hiveContentRoot = './src/hive/documentation/content';

/**
 * The default glob-loader ID generation slugifies path segments, which strips
 * dots ("accounts.js-1.0-rc" becomes "accountsjs-10-rc") and lowercases. The
 * old site uses raw directory names in URLs, so preserve them verbatim to
 * keep every existing URL working — only the file extension is dropped.
 */
function generateHiveId({ entry }: { entry: string }) {
  return entry.replace(/\.(md|mdx)$/, '');
}

/**
 * Hive frontmatter schemas, derived from the shapes every consumer was
 * previously asserting with `as` casts. looseObject() keeps unknown legacy
 * keys instead of stripping them; unions reflect real frontmatter variance
 * in the 400+ migrated files (string vs array authors, string vs date).
 */
const hiveAuthor = z.union([
  z.string(),
  z.looseObject({
    avatar: z.string().optional(),
    name: z.string(),
    position: z.string().optional(),
  }),
]);
// String dates must be ISO days — the product-updates page sorts them
// lexically and parses them with `new Date(`${date}T00:00:00Z`)`.
const hiveDate = z.union([z.date(), z.string().regex(/^\d{4}-\d{2}-\d{2}$/)]);

const docs = defineCollection({
  loader: glob({
    base: `${hiveContentRoot}/docs`,
    generateId: generateHiveId,
    pattern: '**/*.{md,mdx}',
  }),
  schema: z.looseObject({
    title: z.string().optional(),
    sidebarTitle: z.string().optional(),
    description: z.string().optional(),
  }),
});

const productUpdates = defineCollection({
  loader: glob({
    base: `${hiveContentRoot}/product-updates`,
    generateId: generateHiveId,
    pattern: '**/*.{md,mdx}',
  }),
  schema: z.looseObject({
    title: z.string(),
    description: z.string(),
    date: hiveDate,
    authors: z.array(hiveAuthor),
    canonical: z.string().optional(),
  }),
});

const caseStudies = defineCollection({
  loader: glob({
    base: `${hiveContentRoot}/case-studies`,
    generateId: generateHiveId,
    pattern: '**/*.{md,mdx}',
  }),
  schema: z.looseObject({
    title: z.string(),
    excerpt: z.string(),
    category: z.string(),
    date: hiveDate,
    authors: z.array(hiveAuthor).optional(),
    canonical: z.string().optional(),
  }),
});

const hiveBlog = defineCollection({
  loader: glob({
    base: `${hiveContentRoot}/blog`,
    generateId: generateHiveId,
    pattern: '**/*.{md,mdx}',
  }),
  schema: z.looseObject({
    title: z.string(),
    description: z.string().optional(),
    date: hiveDate,
    authors: z.union([z.string(), z.array(hiveAuthor)]),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().optional(),
    canonical: z.string().optional(),
    ogImage: z.string().optional(),
  }),
});

/**
 * GraphQL Codegen content is fetched from the graphql-code-generator repo by
 * scripts/codegen/fetch-content.ts (run in prebuild) — these directories are
 * gitignored and empty until it runs.
 */
const codegenContentRoot = './src/codegen/content';

const codegenDocsSchema = z.looseObject({
  title: z.string().optional(),
  sidebarTitle: z.string().optional(),
  description: z.string().optional(),
});

const codegenDocs = defineCollection({
  loader: glob({
    base: `${codegenContentRoot}/docs`,
    generateId: generateHiveId,
    pattern: '**/*.{md,mdx}',
  }),
  schema: codegenDocsSchema,
});

const codegenPlugins = defineCollection({
  loader: glob({
    base: `${codegenContentRoot}/plugins`,
    generateId: generateHiveId,
    pattern: '**/*.{md,mdx}',
  }),
  schema: codegenDocsSchema.extend({
    hasOperationsNote: z.boolean().optional(),
    isDev: z.boolean().optional(),
  }),
});

/**
 * GraphQL Yoga content is fetched from the graphql-yoga repo by
 * scripts/yoga/fetch-content.ts (run in prebuild) — gitignored and empty
 * until it runs. The older majors live under v2/, v3/ and v4/ in one
 * collection, keyed by version prefix.
 */
const yogaContentRoot = './src/yoga/content';

const yogaDocs = defineCollection({
  loader: glob({
    base: `${yogaContentRoot}/docs`,
    generateId: generateHiveId,
    pattern: '**/*.{md,mdx}',
  }),
  schema: codegenDocsSchema,
});

const yogaTutorial = defineCollection({
  loader: glob({
    base: `${yogaContentRoot}/tutorial`,
    generateId: generateHiveId,
    pattern: '**/*.{md,mdx}',
  }),
  schema: codegenDocsSchema,
});

const yogaLegacy = defineCollection({
  loader: glob({
    base: yogaContentRoot,
    generateId: generateHiveId,
    pattern: 'v[0-9]/**/*.{md,mdx}',
  }),
  schema: codegenDocsSchema,
});

const yogaChangelogs = defineCollection({
  loader: glob({
    base: `${yogaContentRoot}/changelogs`,
    generateId: generateHiveId,
    pattern: '**/*.md',
  }),
  schema: z.looseObject({ title: z.string(), description: z.string().optional() }),
});

const envelopContentRoot = './src/envelop/content';

const envelopDocs = defineCollection({
  loader: glob({
    base: `${envelopContentRoot}/docs`,
    generateId: generateHiveId,
    pattern: '**/*.{md,mdx}',
  }),
  schema: codegenDocsSchema,
});

/**
 * GraphQL Mesh content is fetched from the graphql-mesh repo by
 * scripts/mesh/fetch-content.ts (run in prebuild) — gitignored and empty
 * until it runs. v1 is current (served under /v1); v0 stays under /docs.
 */
const meshContentRoot = './src/mesh/content';

const meshDocs = defineCollection({
  loader: glob({
    base: `${meshContentRoot}/v1`,
    generateId: generateHiveId,
    pattern: '**/*.{md,mdx}',
  }),
  schema: codegenDocsSchema,
});

const envelopLegacy = defineCollection({
  loader: glob({
    base: envelopContentRoot,
    generateId: generateHiveId,
    pattern: 'v[0-9]/**/*.{md,mdx}',
  }),
  schema: codegenDocsSchema,
});

const inspectorDocs = defineCollection({
  loader: glob({
    base: './src/inspector/content/docs',
    generateId: generateHiveId,
    pattern: '**/*.{md,mdx}',
  }),
  schema: codegenDocsSchema,
});

const meshLegacy = defineCollection({
  loader: glob({
    base: `${meshContentRoot}/docs`,
    generateId: generateHiveId,
    pattern: '**/*.{md,mdx}',
  }),
  schema: codegenDocsSchema,
});
// One collection per registry product (src/products/<slug>/product.ts); ids are
// "<section dir>/<path>" so the shared routes can tell the sections apart.
const productModules = import.meta.glob<{ default: { slug: string } }>('./products/*/product.ts', {
  eager: true,
});
const productCollections = Object.fromEntries(
  Object.values(productModules).map(({ default: product }) => [
    `product_${product.slug.replace(/-/g, '_')}`,
    defineCollection({
      loader: glob({
        base: `./src/products/${product.slug}/content`,
        generateId: generateHiveId,
        pattern: '**/*.{md,mdx}',
      }),
      schema: codegenDocsSchema,
    }),
  ]),
);

export const collections = {
  ...productCollections,
  blog,
  caseStudies,
  codegenDocs,
  codegenPlugins,
  docs,
  envelopDocs,
  envelopLegacy,
  hiveBlog,
  inspectorDocs,
  meshDocs,
  meshLegacy,
  productUpdates,
  yogaChangelogs,
  yogaDocs,
  yogaLegacy,
  yogaTutorial,
};
