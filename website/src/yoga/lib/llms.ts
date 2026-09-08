import type { DocsNavNode, DocsNavPage } from '../../docs/nav';
import { YOGA_SITE_URL as SITE_URL } from './base-path';

interface LlmsEntry {
  data: { description?: string };
  id: string;
}

function flattenPages(node: DocsNavNode): DocsNavPage[] {
  if (node.type === 'page') return [node];
  const ownPage = node.href ? [{ href: node.href, title: node.title, type: 'page' as const }] : [];
  return [...ownPage, ...node.children.flatMap(flattenPages)];
}

/** Mount-relative href of a content entry: /docs/<slug> or /tutorial/<slug>. */
export function entryHref(hrefBase: string, entry: { id: string }) {
  const slug = entry.id.replace(/\.(md|mdx)$/, '').replace(/(^|\/)index$/, '');
  return `${hrefBase}${slug ? `/${slug}` : ''}`;
}

/**
 * The llms.txt index for the Yoga docs: the current documentation and the
 * tutorial in sidebar order, linked to their Markdown renditions. Older
 * majors and package changelogs are deliberately left out.
 */
export function getYogaLlmsText(input: {
  docs: LlmsEntry[];
  docsNav: DocsNavNode[];
  tutorial: LlmsEntry[];
  tutorialNav: DocsNavNode[];
}) {
  const byHref = new Map<string, LlmsEntry>([
    ...input.docs.map(entry => [entryHref('/docs', entry), entry] as const),
    ...input.tutorial.map(entry => [entryHref('/tutorial', entry), entry] as const),
  ]);
  const link = (page: DocsNavPage) => {
    const description = byHref.get(page.href)?.data.description;
    return `- [${page.title}](${SITE_URL}${page.href}.md)${description ? `: ${description}` : ''}`;
  };
  const section = (title: string, nodes: DocsNavNode[]) => [
    `## ${title}`,
    '',
    ...nodes.flatMap(flattenPages).map(link),
    '',
  ];

  return [
    '# GraphQL Yoga',
    '',
    '> Batteries-included, cross-platform GraphQL server with a focus on easy setup, performance and developer experience. Runs anywhere the Fetch API does.',
    '',
    ...section('Documentation', input.docsNav),
    ...section('Tutorial', input.tutorialNav),
  ].join('\n');
}
