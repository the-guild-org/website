import { getCollection } from 'astro:content';
import { buildDocsNav, type DocsNav, type MetaJson } from '../../docs/nav';

const docsMetaModules = import.meta.glob<{ default: MetaJson }>('../content/docs/**/meta.json', {
  eager: true,
});
const pluginsMetaModules = import.meta.glob<{ default: MetaJson }>(
  '../content/plugins/**/meta.json',
  { eager: true },
);

function metaMap(modules: Record<string, { default: MetaJson }>, marker: string) {
  const byDir = new Map<string, MetaJson>();
  for (const [path, mod] of Object.entries(modules)) {
    const rel = path.slice(path.indexOf(marker) + marker.length);
    byDir.set(rel.replace(/(^|\/)meta\.json$/, ''), mod.default);
  }
  return byDir;
}

async function build(
  collection: 'codegenDocs' | 'codegenPlugins',
  hrefBase: string,
  metaByDir: Map<string, MetaJson>,
): Promise<DocsNav> {
  const entries = await getCollection(collection);
  return buildDocsNav({
    hrefBase,
    metaByDir,
    entries: entries.map(entry => {
      const data = entry.data as { sidebarTitle?: string; title?: string };
      return { id: entry.id, sidebarTitle: data.sidebarTitle, title: data.title };
    }),
  });
}

let cachedDocs: DocsNav | undefined;
let cachedPlugins: DocsNav | undefined;

export async function getCodegenDocsNav(): Promise<DocsNav> {
  cachedDocs ??= await build('codegenDocs', '/docs', metaMap(docsMetaModules, '/content/docs/'));
  return cachedDocs;
}

export async function getCodegenPluginsNav(): Promise<DocsNav> {
  cachedPlugins ??= await build(
    'codegenPlugins',
    '/plugins',
    metaMap(pluginsMetaModules, '/content/plugins/'),
  );
  return cachedPlugins;
}
