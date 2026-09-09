import { getCollection } from 'astro:content';
import { getInspectorDocsNav } from '../../../inspector/lib/docs-nav';
import { getInspectorLlmsText } from '../../../inspector/lib/llms';

export const prerender = true;

export async function GET() {
  const [docs, docsNav] = await Promise.all([
    getCollection('inspectorDocs'),
    getInspectorDocsNav(),
  ]);
  return new Response(getInspectorLlmsText({ docs, docsNav: docsNav.tree }), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
