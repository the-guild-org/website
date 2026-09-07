import type { DocsNavNode, DocsNavPage } from '../../docs/nav';
import { CODEGEN_SITE_URL as SITE_URL } from './base-path';

interface LlmsEntry {
  body?: string;
  data: { description?: string };
  id: string;
}

function flattenPages(node: DocsNavNode): DocsNavPage[] {
  if (node.type === 'page') return [node];
  const ownPage = node.href ? [{ href: node.href, title: node.title, type: 'page' as const }] : [];
  return [...ownPage, ...node.children.flatMap(flattenPages)];
}

/** Mount-relative href of a content entry: /docs/<slug> or /plugins/<slug>. */
export function entryHref(hrefBase: string, entry: { id: string }) {
  const slug = entry.id.replace(/\.(md|mdx)$/, '').replace(/(^|\/)index$/, '');
  return `${hrefBase}${slug ? `/${slug}` : ''}`;
}

/**
 * The llms.txt index for the Codegen docs: every documentation page and
 * plugin page in sidebar order, linked to its Markdown rendition. Plugin
 * pages without prose of their own have no Markdown; they link to the page.
 */
export function getCodegenLlmsText(input: {
  docs: LlmsEntry[];
  docsNav: DocsNavNode[];
  plugins: LlmsEntry[];
  pluginsNav: DocsNavNode[];
}) {
  const byHref = new Map<string, LlmsEntry>([
    ...input.docs.map(entry => [entryHref('/docs', entry), entry] as const),
    ...input.plugins.map(entry => [entryHref('/plugins', entry), entry] as const),
  ]);
  const link = (page: DocsNavPage) => {
    const entry = byHref.get(page.href);
    const hasMarkdown = (entry?.body ?? '').trim().length > 0;
    const description = entry?.data.description ? `: ${entry.data.description}` : '';
    return `- [${page.title}](${SITE_URL}${page.href}${hasMarkdown ? '.md' : ''})${description}`;
  };
  const section = (title: string, nodes: DocsNavNode[]) => [
    `## ${title}`,
    '',
    ...nodes.flatMap(flattenPages).map(link),
    '',
  ];

  return [
    '# GraphQL Code Generator',
    '',
    '> Generate typed code from GraphQL schemas and operations: clients, resolvers, SDKs and more, through a plugin ecosystem.',
    '',
    ...section('Documentation', input.docsNav),
    ...section('Plugins and presets', input.pluginsNav),
  ].join('\n');
}
