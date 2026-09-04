import { getDocsSlug, markdownResponse } from '~hive/lib/docs-markdown';
import { getCollection } from 'astro:content';

export const prerender = true;

export async function GET() {
  const entry = (await getCollection('docs')).find(candidate => !getDocsSlug(candidate));
  if (!entry) return new Response('Not found', { status: 404 });

  return markdownResponse(entry);
}
