import { getCollection } from 'astro:content';
import { buildDocsNav, type DocsNav, type MetaJson } from '../../docs/nav';

const metaModules = import.meta.glob<{ default: MetaJson }>('../content/**/meta.json', {
  eager: true,
});

/** meta.json files under the docs folder, keyed by directory relative to it. */
function metaFor(section: string) {
  const marker = `/content/${section}/`;
  const byDir = new Map<string, MetaJson>();
  for (const [path, mod] of Object.entries(metaModules)) {
    const index = path.indexOf(marker);
    if (index === -1) continue;
    const rel = path.slice(index + marker.length);
    byDir.set(rel.replace(/(^|\/)meta\.json$/, ''), mod.default);
  }
  return byDir;
}

let cached: Promise<DocsNav> | undefined;

export function getInspectorDocsNav() {
  cached ??= getCollection('inspectorDocs').then(entries =>
    buildDocsNav({
      hrefBase: '/docs',
      metaByDir: metaFor('docs'),
      entries: entries.map(entry => ({
        id: entry.id,
        sidebarTitle: entry.data.sidebarTitle,
        title: entry.data.title,
      })),
    }),
  );
  return cached;
}
