import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const contentRoot = "../documentation/content";

/**
 * The default glob-loader ID generation slugifies path segments, which strips
 * dots ("accounts.js-1.0-rc" becomes "accountsjs-10-rc") and lowercases. The
 * old site uses raw directory names in URLs, so preserve them verbatim to
 * keep every existing URL working — only the file extension is dropped.
 */
function generateId({ entry }: { entry: string }) {
  return entry.replace(/\.(md|mdx)$/, "");
}

const docs = defineCollection({
  loader: glob({
    base: `${contentRoot}/docs`,
    generateId,
    pattern: "**/*.{md,mdx}",
  }),
});

const productUpdates = defineCollection({
  loader: glob({
    base: `${contentRoot}/product-updates`,
    generateId,
    pattern: "**/*.{md,mdx}",
  }),
});

const caseStudies = defineCollection({
  loader: glob({
    base: `${contentRoot}/case-studies`,
    generateId,
    pattern: "**/*.{md,mdx}",
  }),
});

const blog = defineCollection({
  loader: glob({
    base: `${contentRoot}/blog`,
    generateId,
    pattern: "**/*.{md,mdx}",
  }),
});

export const collections = {
  blog,
  caseStudies,
  docs,
  productUpdates,
};
