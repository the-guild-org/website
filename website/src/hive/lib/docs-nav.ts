import { getCollection } from 'astro:content';
import { buildDocsNav, type DocsNav, type MetaJson } from '../../docs/nav';

export type { DocsNav, DocsNavFolder, DocsNavNode, DocsNavPage } from '../../docs/nav';

const metaModules = import.meta.glob<{ default: MetaJson }>(
  '../documentation/content/docs/**/meta.json',
  { eager: true },
);

const iconModules = import.meta.glob<string>('../design-system/icons/*.svg', {
  eager: true,
  import: 'default',
  query: '?raw',
});

function dirOfMetaPath(fullPath: string) {
  const marker = '/content/docs/';
  const rel = fullPath.slice(fullPath.indexOf(marker) + marker.length);
  return rel.replace(/(^|\/)meta\.json$/, '');
}

const metaByDir = new Map<string, MetaJson>();
for (const [path, mod] of Object.entries(metaModules)) {
  metaByDir.set(dirOfMetaPath(path), mod.default);
}

function iconRawSvg(iconName: string) {
  const fileName = iconName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  return iconModules[`../design-system/icons/${fileName}.svg`];
}

let cached: DocsNav | undefined;

export async function getDocsNav(): Promise<DocsNav> {
  if (cached) return cached;

  const entries = await getCollection('docs');
  cached = buildDocsNav({
    hrefBase: '/docs',
    metaByDir,
    iconRawSvg,
    entries: entries.map(entry => {
      const data = entry.data as { sidebarTitle?: string; title?: string };
      return { id: entry.id, sidebarTitle: data.sidebarTitle, title: data.title };
    }),
  });
  return cached;
}
