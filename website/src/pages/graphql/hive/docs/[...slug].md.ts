import { getDocsSlug, markdownResponse } from '~hive/lib/docs-markdown';
import { getCollection, type CollectionEntry } from 'astro:content';

type DocsEntry = CollectionEntry<'docs'>;

export const prerender = true;

export async function getStaticPaths() {
  const entries = await getCollection('docs');

  return entries.flatMap(entry => {
    const slug = getDocsSlug(entry);
    return slug ? [{ params: { slug }, props: { entry } }] : [];
  });
}

export function GET({ props }: { props: { entry: DocsEntry } }) {
  return markdownResponse(props.entry);
}
