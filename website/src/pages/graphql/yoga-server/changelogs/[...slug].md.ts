import { markdownResponse } from '~hive/lib/docs-markdown';
import { getCollection, type CollectionEntry } from 'astro:content';

type Entry = CollectionEntry<'yogaChangelogs'>;

export const prerender = true;

export async function getStaticPaths() {
  const entries = await getCollection('yogaChangelogs');
  return entries.map(entry => ({ params: { slug: entry.id.replace(/\.md$/, '') }, props: { entry } }));
}

export function GET({ props }: { props: { entry: Entry } }) {
  return markdownResponse(props.entry as never);
}
