import type { ProductDefinition } from '../../../products/define';
import { getProductLlmsText } from '../../../products/llms';
import { entryHref, getProductEntries, getProductNav, sectionOf } from '../../../products/nav';
import { PRODUCTS } from '../../../products/registry';

export const prerender = true;

export function getStaticPaths() {
  return PRODUCTS.map(product => ({ params: { product: product.slug }, props: { product } }));
}

export async function GET({ props }: { props: { product: ProductDefinition } }) {
  const { product } = props;
  const entries = await getProductEntries(product);
  const descriptions = new Map(
    entries.flatMap(entry => {
      const section = sectionOf(product, entry.id);
      return section ? [[entryHref(section, entry.id), entry.data.description] as const] : [];
    }),
  );
  const sections = await Promise.all(
    product.sections.map(async section => ({
      label: section.label,
      nav: (await getProductNav(product, section)).tree,
    })),
  );
  return new Response(getProductLlmsText(product, sections, descriptions), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
