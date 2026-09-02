import { getCollection, type CollectionEntry } from "astro:content";

import { getDocsSlug, markdownResponse } from "../../lib/docs-markdown";

type DocsEntry = CollectionEntry<"docs">;

export const prerender = true;

export async function getStaticPaths() {
  const entries = await getCollection("docs");

  return entries.flatMap((entry) => {
    const slug = getDocsSlug(entry);
    return slug ? [{ params: { slug }, props: { entry } }] : [];
  });
}

export function GET({ props }: { props: { entry: DocsEntry } }) {
  return markdownResponse(props.entry);
}
