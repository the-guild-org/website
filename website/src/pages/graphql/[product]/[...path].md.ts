import { markdownResponse } from '~hive/lib/docs-markdown';
import { entryHref, getProductEntries, sectionOf } from '../../../products/nav';
import { PRODUCTS } from '../../../products/registry';

export const prerender = true;

/** Every content page of every registry product as Markdown. */
export async function getStaticPaths() {
  const paths = [];
  for (const product of PRODUCTS) {
    for (const entry of await getProductEntries(product)) {
      const section = sectionOf(product, entry.id);
      if (!section) continue;
      paths.push({
        params: { product: product.slug, path: entryHref(section, entry.id).slice(1) },
        props: { entry },
      });
    }
  }
  return paths;
}

export function GET({ props }: { props: { entry: unknown } }) {
  return markdownResponse(props.entry as never);
}
