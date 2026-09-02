import { getCollection } from "astro:content";

export interface BlogPost {
  authors: string[];
  date: string;
  description: string;
  featured: boolean;
  route: string;
  slug: string;
  tags: string[];
  title: string;
}

function slug(id: string) {
  return id.replace(/\/index$/, "").replace(/\.(md|mdx)$/, "");
}

function dateString(value: unknown) {
  return value instanceof Date
    ? value.toISOString().slice(0, 10)
    : String(value);
}

/**
 * Returns a merged feed of blog posts, product updates, and case studies.
 * Mirrors the old site's behavior where all content types appear in /blog.
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  const [blogEntries, productUpdateEntries, caseStudyEntries] =
    await Promise.all([
      getCollection("blog"),
      getCollection("productUpdates"),
      getCollection("caseStudies"),
    ]);

  const blogPosts = blogEntries.map((entry) => {
    const data = entry.data as {
      authors: string | string[];
      date: Date | string;
      description?: string;
      featured?: boolean;
      tags: string[];
      title: string;
    };
    const authors = Array.isArray(data.authors) ? data.authors : [data.authors];

    return {
      authors,
      date: dateString(data.date),
      description: data.description ?? "",
      featured: data.featured ?? false,
      route: `/blog/${slug(entry.id)}`,
      slug: slug(entry.id),
      tags: data.tags,
      title: data.title,
    };
  });

  const productUpdatePosts = productUpdateEntries.map((entry) => {
    const data = entry.data as {
      authors: (string | { name: string })[];
      date: Date | string;
      description: string;
      title: string;
    };

    return {
      authors: data.authors.map((a) => (typeof a === "string" ? a : a.name)),
      date: dateString(data.date),
      description: data.description ?? "",
      featured: false,
      route: `/product-updates/${slug(entry.id)}`,
      slug: slug(entry.id),
      tags: ["Product Update"],
      title: data.title,
    };
  });

  const caseStudyPosts = caseStudyEntries.map((entry) => {
    const data = entry.data as {
      authors?: { name: string }[];
      date: Date | string;
      excerpt: string;
      title: string;
    };

    return {
      authors: data.authors?.map((a) => a.name) ?? [],
      date: dateString(data.date),
      description: data.excerpt ?? "",
      featured: false,
      route: `/case-studies/${slug(entry.id)}`,
      slug: slug(entry.id),
      tags: ["Case Study"],
      title: data.title,
    };
  });

  return [...blogPosts, ...productUpdatePosts, ...caseStudyPosts].sort((a, b) =>
    a.date < b.date ? 1 : -1,
  );
}
