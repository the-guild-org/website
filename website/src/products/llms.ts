import type { DocsNavNode, DocsNavPage } from '../docs/nav';
import { productSiteUrl, type ProductDefinition } from './define';

function flattenPages(node: DocsNavNode): DocsNavPage[] {
  if (node.type === 'page') return [node];
  const ownPage = node.href ? [{ href: node.href, title: node.title, type: 'page' as const }] : [];
  return [...ownPage, ...node.children.flatMap(flattenPages)];
}

/**
 * The llms.txt index of a product: every section's pages in sidebar order,
 * linked to their Markdown renditions.
 */
export function getProductLlmsText(
  product: ProductDefinition,
  sections: { label: string; nav: DocsNavNode[] }[],
  descriptions: Map<string, string | undefined>,
) {
  const siteUrl = productSiteUrl(product);
  const link = (page: DocsNavPage) => {
    const description = descriptions.get(page.href);
    return `- [${page.title}](${siteUrl}${page.href}.md)${description ? `: ${description}` : ''}`;
  };
  return [
    `# ${product.name}`,
    '',
    `> ${product.llmsTagline}`,
    '',
    ...sections.flatMap(section => [
      `## ${section.label}`,
      '',
      ...section.nav.flatMap(flattenPages).map(link),
      '',
    ]),
  ].join('\n');
}
