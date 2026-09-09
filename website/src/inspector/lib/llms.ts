import type { DocsNavNode, DocsNavPage } from '../../docs/nav';
import { INSPECTOR_SITE_URL as SITE_URL } from './base-path';

interface LlmsEntry {
  data: { description?: string };
  id: string;
}

function flattenPages(node: DocsNavNode): DocsNavPage[] {
  if (node.type === 'page') return [node];
  const ownPage = node.href ? [{ href: node.href, title: node.title, type: 'page' as const }] : [];
  return [...ownPage, ...node.children.flatMap(flattenPages)];
}

/** Mount-relative href of a content entry under a section: /docs/<slug>. */
export function entryHref(hrefBase: string, entry: { id: string }) {
  const slug = entry.id.replace(/\.(md|mdx)$/, '').replace(/(^|\/)index$/, '');
  return `${hrefBase}${slug ? `/${slug}` : ''}`;
}

/** The llms.txt index for GraphQL Inspector: the docs in sidebar order, linked to Markdown. */
export function getInspectorLlmsText(input: { docs: LlmsEntry[]; docsNav: DocsNavNode[] }) {
  const byHref = new Map(input.docs.map(entry => [entryHref('/docs', entry), entry] as const));
  const link = (page: DocsNavPage) => {
    const description = byHref.get(page.href)?.data.description;
    return `- [${page.title}](${SITE_URL}${page.href}.md)${description ? `: ${description}` : ''}`;
  };
  return [
    '# GraphQL Inspector',
    '',
    '> Tools to compare GraphQL schemas and detect breaking changes, validate operations and fragments, measure schema coverage, and get schema change notifications, as a CLI, a GitHub Action, and a programmatic API.',
    '',
    '## Documentation',
    '',
    ...input.docsNav.flatMap(flattenPages).map(link),
    '',
  ].join('\n');
}
