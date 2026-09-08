import { getDocsMarkdown } from '~hive/lib/docs-markdown';
import { getCollection } from 'astro:content';
import { getCodegenDocsNav, getCodegenPluginsNav } from '../../../codegen/lib/docs-nav';
import { entryHref } from '../../../codegen/lib/llms';
import type { DocsNavNode } from '../../../docs/nav';

export const prerender = true;

function hrefsInOrder(nodes: DocsNavNode[]): string[] {
  return nodes.flatMap(node =>
    node.type === 'page'
      ? [node.href]
      : [...(node.href ? [node.href] : []), ...hrefsInOrder(node.children)],
  );
}

/**
 * The whole Codegen documentation as one Markdown file for LLM consumption:
 * docs pages then plugin pages, in sidebar order, from the same per-page
 * Markdown that backs the *.md endpoints.
 */
export async function GET() {
  const [docs, plugins, docsNav, pluginsNav] = await Promise.all([
    getCollection('codegenDocs'),
    getCollection('codegenPlugins'),
    getCodegenDocsNav(),
    getCodegenPluginsNav(),
  ]);
  const byHref = new Map<string, { body?: string; id: string }>([
    ...docs.map(entry => [entryHref('/docs', entry), entry] as const),
    ...plugins.map(entry => [entryHref('/plugins', entry), entry] as const),
  ]);
  const ordered = [...hrefsInOrder(docsNav.tree), ...hrefsInOrder(pluginsNav.tree)]
    .map(href => byHref.get(href))
    .filter(entry => entry && (entry.body ?? '').trim().length > 0);

  return new Response(ordered.map(entry => getDocsMarkdown(entry as never)).join('\n\n'), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
