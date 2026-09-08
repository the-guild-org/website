import { getCollection } from 'astro:content';
import { getMeshDocsNav } from '../../../mesh/lib/docs-nav';
import { getMeshLlmsText } from '../../../mesh/lib/llms';

export const prerender = true;

export async function GET() {
  const [docs, docsNav] = await Promise.all([getCollection('meshDocs'), getMeshDocsNav()]);
  return new Response(getMeshLlmsText({ docs, docsNav: docsNav.tree }), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
