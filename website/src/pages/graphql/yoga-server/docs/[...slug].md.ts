import { markdownResponse } from '~hive/lib/docs-markdown';
import { getCollection, type CollectionEntry } from 'astro:content';

type Entry = CollectionEntry<'yogaDocs'>;

export const prerender = true;

export async function getStaticPaths() {
  const entries = await getCollection('yogaDocs');
  return entries.flatMap(entry => {
    const slug = entry.id.replace(/(^|\/)index$/, '').replace(/\.(md|mdx)$/, '');
    return slug ? [{ params: { slug }, props: { entry } }] : [];
  });
}

export function GET({ props }: { props: { entry: Entry } }) {
  return markdownResponse(props.entry as never);
}
