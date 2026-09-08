import { getDocsMarkdown } from '~hive/lib/docs-markdown';
import { getCollection } from 'astro:content';
import type { DocsNavNode } from '../../../docs/nav';
import { getMeshDocsNav } from '../../../mesh/lib/docs-nav';
import { entryHref } from '../../../mesh/lib/llms';

export const prerender = true;

function hrefsInOrder(nodes: DocsNavNode[]): string[] {
  return nodes.flatMap(node =>
    node.type === 'page'
      ? [node.href]
      : [...(node.href ? [node.href] : []), ...hrefsInOrder(node.children)],
  );
}

/** The current (v1) Mesh documentation as one Markdown file, in sidebar order. */
export async function GET() {
  const [docs, docsNav] = await Promise.all([getCollection('meshDocs'), getMeshDocsNav()]);
  const byHref = new Map(docs.map(entry => [entryHref('/v1', entry), entry] as const));
  const ordered = hrefsInOrder(docsNav.tree)
    .map(href => byHref.get(href))
    .filter(entry => entry && (entry.body ?? '').trim().length > 0);
  return new Response(ordered.map(entry => getDocsMarkdown(entry as never)).join('\n\n'), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
