import { getCollection } from "astro:content";

import { getDocsMarkdown, getDocsSlug } from "../../../hive/lib/docs-markdown";

/**
 * The full documentation as one Markdown file for LLM consumption.
 * The old site serves this at runtime; here it is prerendered from the same
 * per-page Markdown that backs the /docs/*.md endpoints.
 */
export async function GET() {
  const entries = (await getCollection("docs")).sort((a, b) =>
    getDocsSlug(a).localeCompare(getDocsSlug(b)),
  );

  return new Response(entries.map(getDocsMarkdown).join("\n\n"), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
