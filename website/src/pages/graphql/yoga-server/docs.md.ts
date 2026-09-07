import { markdownResponse } from '~hive/lib/docs-markdown';
import { getCollection } from 'astro:content';

export const prerender = true;

/** The docs root page (content/docs/index.mdx) as Markdown. */
export async function GET() {
  const entry = (await getCollection('yogaDocs')).find(candidate => candidate.id === 'index');
  if (!entry) return new Response('Not found', { status: 404 });
  return markdownResponse(entry as never);
}
