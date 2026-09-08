import { markdownResponse } from '~hive/lib/docs-markdown';
import { getCollection, type CollectionEntry } from 'astro:content';
import { isLegacyVersion } from '../../../../envelop/lib/docs-nav';

type Entry = CollectionEntry<'envelopLegacy'>;

export const prerender = true;

export async function getStaticPaths() {
  const entries = await getCollection('envelopLegacy');
  return entries.flatMap(entry => {
    const [version, ...rest] = entry.id.split('/');
    if (!version || !isLegacyVersion(version)) return [];
    const slug = rest
      .join('/')
      .replace(/(^|\/)index$/, '')
      .replace(/\.(md|mdx)$/, '');
    return slug ? [{ params: { version, slug }, props: { entry } }] : [];
  });
}

export function GET({ props }: { props: { entry: Entry } }) {
  return markdownResponse(props.entry as never);
}
