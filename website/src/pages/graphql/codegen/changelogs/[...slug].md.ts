import { markdownResponse } from '~hive/lib/docs-markdown';
import { getCollection, type CollectionEntry } from 'astro:content';

type Entry = CollectionEntry<'codegenChangelogs'>;

export const prerender = true;

export async function getStaticPaths() {
  const entries = await getCollection('codegenChangelogs');
  return entries.map(entry => ({ params: { slug: entry.id }, props: { entry } }));
}

export function GET({ props }: { props: { entry: Entry } }) {
  return markdownResponse(props.entry as never);
}
