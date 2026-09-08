import type { DocsNavNode, DocsNavPage } from '../../docs/nav';
import { ENVELOP_SITE_URL as SITE_URL } from './base-path';

interface LlmsEntry {
  data: { description?: string };
  id: string;
}

interface LlmsPlugin {
  description: string;
  key: string;
  npmPackage: string;
  title: string;
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

/**
 * The llms.txt index for Envelop: the current (v4) documentation in sidebar
 * order plus the Plugin Hub, linked to their Markdown renditions. Older
 * majors are deliberately left out.
 */
export function getEnvelopLlmsText(input: {
  docs: LlmsEntry[];
  docsNav: DocsNavNode[];
  plugins: LlmsPlugin[];
}) {
  const byHref = new Map(input.docs.map(entry => [entryHref('/docs', entry), entry] as const));
  const link = (page: DocsNavPage) => {
    const description = byHref.get(page.href)?.data.description;
    return `- [${page.title}](${SITE_URL}${page.href}.md)${description ? `: ${description}` : ''}`;
  };
  return [
    '# Envelop',
    '',
    '> The missing GraphQL plugin system: a lightweight library for customizing the GraphQL execution layer with composable, shareable plugins that work with any GraphQL server framework or schema.',
    '',
    '## Documentation (Envelop v4)',
    '',
    ...input.docsNav.flatMap(flattenPages).map(link),
    '',
    '## Plugins',
    '',
    ...input.plugins.map(
      plugin =>
        `- [${plugin.title}](${SITE_URL}/plugins/${plugin.key}.md): ${plugin.npmPackage}${plugin.description ? ` — ${plugin.description}` : ''}`,
    ),
    '',
  ].join('\n');
}
