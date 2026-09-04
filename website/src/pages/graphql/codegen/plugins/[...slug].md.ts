import { markdownResponse } from '~hive/lib/docs-markdown';
import { getCollection, type CollectionEntry } from 'astro:content';

type PluginEntry = CollectionEntry<'codegenPlugins'>;

export const prerender = true;

export async function getStaticPaths() {
  const entries = await getCollection('codegenPlugins');
  // Pure-shim pages have no prose of their own — no markdown to serve.
  return entries
    .filter(entry => (entry.body ?? '').trim().length > 0)
    .map(entry => ({
      params: { slug: entry.id.replace(/\.(md|mdx)$/, '') },
      props: { entry },
    }));
}

export function GET({ props }: { props: { entry: PluginEntry } }) {
  return markdownResponse(props.entry as never);
}
