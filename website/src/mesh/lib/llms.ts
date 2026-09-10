import type { DocsNavNode, DocsNavPage } from '../../docs/nav';
import { MESH_SITE_URL as SITE_URL } from './base-path';

interface LlmsEntry {
  data: { description?: string };
  id: string;
}

function flattenPages(node: DocsNavNode): DocsNavPage[] {
  if (node.type === 'page') return [node];
  const ownPage = node.href ? [{ href: node.href, title: node.title, type: 'page' as const }] : [];
  return [...ownPage, ...node.children.flatMap(flattenPages)];
}

/** Mount-relative href of a content entry under a section: /v1/<slug>. */
export function entryHref(hrefBase: string, entry: { id: string }) {
  const slug = entry.id.replace(/\.(md|mdx)$/, '').replace(/(^|\/)index$/, '');
  return `${hrefBase}${slug ? `/${slug}` : ''}`;
}

/**
 * The llms.txt index for the Mesh docs: the current (v1) documentation in
 * sidebar order, linked to its Markdown renditions. The v0 docs are
 * deliberately left out.
 */
export function getMeshLlmsText(input: { docs: LlmsEntry[]; docsNav: DocsNavNode[] }) {
  const byHref = new Map(input.docs.map(entry => [entryHref('/v1', entry), entry] as const));
  const link = (page: DocsNavPage) => {
    const description = byHref.get(page.href)?.data.description;
    return `- [${page.title}](${SITE_URL}${page.href}.md)${description ? `: ${description}` : ''}`;
  };
  return [
    '# GraphQL Mesh',
    '',
    '> GraphQL federation framework that composes GraphQL and non-GraphQL sources (REST, gRPC, SOAP, databases and more) into one supergraph, served by Hive Gateway or any federation-compatible gateway.',
    '',
    '## Documentation (Mesh v1)',
    '',
    ...input.docsNav.flatMap(flattenPages).map(link),
    '',
  ].join('\n');
}
