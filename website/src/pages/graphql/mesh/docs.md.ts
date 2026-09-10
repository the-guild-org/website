import { markdownResponse } from '~hive/lib/docs-markdown';
import { getCollection } from 'astro:content';

export const prerender = true;

/** The section's root page (index.mdx) as Markdown. */
export async function GET() {
  const entry = (await getCollection('meshLegacy')).find(candidate => candidate.id === 'index');
  if (!entry) return new Response('Not found', { status: 404 });
  return markdownResponse(entry as never);
}
