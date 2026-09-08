import { markdownResponse } from '~hive/lib/docs-markdown';
import { getCollection } from 'astro:content';
import { LEGACY_VERSIONS } from '../../../envelop/lib/site';

export const prerender = true;

/** An older major's root page (v<n>/index.mdx) as Markdown. */
export async function getStaticPaths() {
  const entries = await getCollection('envelopLegacy');
  return LEGACY_VERSIONS.flatMap(version => {
    const entry = entries.find(candidate => candidate.id === `${version}/index`);
    return entry ? [{ params: { version }, props: { entry } }] : [];
  });
}

export function GET({ props }: { props: { entry: unknown } }) {
  return markdownResponse(props.entry as never);
}
