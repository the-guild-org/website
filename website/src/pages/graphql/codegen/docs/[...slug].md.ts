import { markdownResponse } from '~hive/lib/docs-markdown';
import { getCollection, type CollectionEntry } from 'astro:content';

type DocsEntry = CollectionEntry<'codegenDocs'>;

export const prerender = true;

export async function getStaticPaths() {
  const entries = await getCollection('codegenDocs');
  return entries.flatMap(entry => {
    const slug = entry.id.replace(/(^|\/)index$/, '').replace(/\.(md|mdx)$/, '');
    return slug ? [{ params: { slug }, props: { entry } }] : [];
  });
}

export function GET({ props }: { props: { entry: DocsEntry } }) {
  return markdownResponse(props.entry as never);
}
