import { getCollection } from 'astro:content';
import { buildDocsNav, type DocsNav, type MetaJson } from '../docs/nav';
import { productCollection, type ProductDefinition, type ProductSection } from './define';

const metaModules = import.meta.glob<{ default: MetaJson }>('./*/content/**/meta.json', {
  eager: true,
});

/** meta.json files under one product section, keyed by directory relative to it. */
function metaFor(product: ProductDefinition, section: ProductSection) {
  const marker = `./${product.slug}/content/${section.dir}/`;
  const byDir = new Map<string, MetaJson>();
  for (const [path, mod] of Object.entries(metaModules)) {
    if (!path.startsWith(marker)) continue;
    const rel = path.slice(marker.length);
    byDir.set(rel.replace(/(^|\/)meta\.json$/, ''), mod.default);
  }
  return byDir;
}

/** All content entries of a product, ids of the form "<section dir>/<path>". */
export async function getProductEntries(product: ProductDefinition) {
  return getCollection(productCollection(product) as never) as Promise<
    {
      body?: string;
      data: { description?: string; sidebarTitle?: string; title?: string };
      filePath?: string;
      id: string;
    }[]
  >;
}

const cache = new Map<string, Promise<DocsNav>>();

/** The sidebar of one section of a product. */
export function getProductNav(product: ProductDefinition, section: ProductSection) {
  const key = `${product.slug}:${section.dir}`;
  let nav = cache.get(key);
  if (!nav) {
    nav = getProductEntries(product).then(entries =>
      buildDocsNav({
        hrefBase: section.base,
        metaByDir: metaFor(product, section),
        entries: entries
          .filter(entry => entry.id.startsWith(`${section.dir}/`))
          .map(entry => ({
            id: entry.id.slice(section.dir.length + 1),
            sidebarTitle: entry.data.sidebarTitle,
            title: entry.data.title,
          })),
      }),
    );
    cache.set(key, nav);
  }
  return nav;
}

/** The section an entry belongs to, by its id prefix. */
export function sectionOf(product: ProductDefinition, entryId: string): ProductSection | undefined {
  return product.sections.find(section => entryId.startsWith(`${section.dir}/`));
}

/** Mount-relative href of an entry: "<section base>/<slug>" ("<section base>" for the index). */
export function entryHref(section: ProductSection, entryId: string): string {
  const slug = entryId
    .slice(section.dir.length + 1)
    .replace(/\.(md|mdx)$/, '')
    .replace(/(^|\/)index$/, '');
  return `${section.base}${slug ? `/${slug}` : ''}`;
}
