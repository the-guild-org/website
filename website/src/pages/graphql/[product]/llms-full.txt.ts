import { getDocsMarkdown } from '~hive/lib/docs-markdown';
import type { DocsNavNode } from '../../../docs/nav';
import type { ProductDefinition } from '../../../products/define';
import { entryHref, getProductEntries, getProductNav, sectionOf } from '../../../products/nav';
import { PRODUCTS } from '../../../products/registry';

export const prerender = true;

export function getStaticPaths() {
  return PRODUCTS.map(product => ({ params: { product: product.slug }, props: { product } }));
}

function hrefsInOrder(nodes: DocsNavNode[]): string[] {
  return nodes.flatMap(node =>
    node.type === 'page'
      ? [node.href]
      : [...(node.href ? [node.href] : []), ...hrefsInOrder(node.children)],
  );
}

/** A product's whole documentation as one Markdown file, section by section in sidebar order. */
export async function GET({ props }: { props: { product: ProductDefinition } }) {
  const { product } = props;
  const entries = await getProductEntries(product);
  const byHref = new Map(
    entries.flatMap(entry => {
      const section = sectionOf(product, entry.id);
      return section ? [[entryHref(section, entry.id), entry] as const] : [];
    }),
  );
  const ordered = [];
  for (const section of product.sections) {
    const nav = await getProductNav(product, section);
    ordered.push(
      ...hrefsInOrder(nav.tree)
        .map(href => byHref.get(href))
        .filter(entry => entry && (entry.body ?? '').trim().length > 0),
    );
  }
  return new Response(ordered.map(entry => getDocsMarkdown(entry as never)).join('\n\n'), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
