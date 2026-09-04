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

const docs = defineCollection({
  loader: glob({
    base: `${hiveContentRoot}/docs`,
    generateId: generateHiveId,
    pattern: '**/*.{md,mdx}',
  }),
});

const productUpdates = defineCollection({
  loader: glob({
    base: `${hiveContentRoot}/product-updates`,
    generateId: generateHiveId,
    pattern: '**/*.{md,mdx}',
  }),
});

const caseStudies = defineCollection({
  loader: glob({
    base: `${hiveContentRoot}/case-studies`,
    generateId: generateHiveId,
    pattern: '**/*.{md,mdx}',
  }),
});

const hiveBlog = defineCollection({
  loader: glob({
    base: `${hiveContentRoot}/blog`,
    generateId: generateHiveId,
    pattern: '**/*.{md,mdx}',
  }),
});

export const collections = { blog, caseStudies, docs, hiveBlog, productUpdates };
