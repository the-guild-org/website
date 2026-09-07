import { markdownResponse } from '~hive/lib/docs-markdown';
import { getCollection, type CollectionEntry } from 'astro:content';
import { isLegacyVersion } from '../../../../yoga/lib/docs-nav';

type Entry = CollectionEntry<'yogaLegacy'>;

export const prerender = true;

export async function getStaticPaths() {
  const entries = await getCollection('yogaLegacy');
  return entries.flatMap(entry => {
    const [version, ...rest] = entry.id.split('/');
    if (!version || !isLegacyVersion(version)) return [];
    const slug = rest
      .join('/')
      .replace(/(^|\/)index$/, '')
      .replace(/\.(md|mdx)$/, '');
    return [{ params: { version, slug: slug || undefined }, props: { entry } }];
  });
}

export function GET({ props }: { props: { entry: Entry } }) {
  return markdownResponse(props.entry as never);
}
