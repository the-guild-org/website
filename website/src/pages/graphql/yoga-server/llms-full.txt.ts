import { getDocsMarkdown } from '~hive/lib/docs-markdown';
import { getCollection } from 'astro:content';
import type { DocsNavNode } from '../../../docs/nav';
import { getYogaDocsNav, getYogaTutorialNav } from '../../../yoga/lib/docs-nav';
import { entryHref } from '../../../yoga/lib/llms';

export const prerender = true;

function hrefsInOrder(nodes: DocsNavNode[]): string[] {
  return nodes.flatMap(node =>
    node.type === 'page'
      ? [node.href]
      : [...(node.href ? [node.href] : []), ...hrefsInOrder(node.children)],
  );
}

/**
 * The current Yoga documentation and tutorial as one Markdown file for LLM
 * consumption, in sidebar order, from the same per-page Markdown that backs
 * the *.md endpoints.
 */
export async function GET() {
  const [docs, tutorial, docsNav, tutorialNav] = await Promise.all([
    getCollection('yogaDocs'),
    getCollection('yogaTutorial'),
    getYogaDocsNav(),
    getYogaTutorialNav(),
  ]);
  const byHref = new Map<string, { body?: string; id: string }>([
    ...docs.map(entry => [entryHref('/docs', entry), entry] as const),
    ...tutorial.map(entry => [entryHref('/tutorial', entry), entry] as const),
  ]);
  const ordered = [...hrefsInOrder(docsNav.tree), ...hrefsInOrder(tutorialNav.tree)]
    .map(href => byHref.get(href))
    .filter(entry => entry && (entry.body ?? '').trim().length > 0);

  return new Response(ordered.map(entry => getDocsMarkdown(entry as never)).join('\n\n'), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
