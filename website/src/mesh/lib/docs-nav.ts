import { getCollection } from 'astro:content';
import { buildDocsNav, type DocsNav, type MetaJson } from '../../docs/nav';

const metaModules = import.meta.glob<{ default: MetaJson }>('../content/**/meta.json', {
  eager: true,
});

/** meta.json files under one top-level content folder, keyed by directory relative to it. */
function metaFor(section: string) {
  const marker = `/content/${section}/`;
  const byDir = new Map<string, MetaJson>();
  for (const [path, mod] of Object.entries(metaModules)) {
    const index = path.indexOf(marker);
    if (index === -1) continue;
    byDir.set(path.slice(index + marker.length).replace(/(^|\/)meta\.json$/, ''), mod.default);
  }
  return byDir;
}

type Entry = { id: string; data: { sidebarTitle?: string; title?: string } };

function build(hrefBase: string, section: string, entries: Entry[]): DocsNav {
  return buildDocsNav({
    hrefBase,
    metaByDir: metaFor(section),
    entries: entries.map(entry => ({
      id: entry.id,
      sidebarTitle: entry.data.sidebarTitle,
      title: entry.data.title,
    })),
  });
}

let docsNav: Promise<DocsNav> | undefined;
let legacyNav: Promise<DocsNav> | undefined;

/** Mesh v1, the current docs, served under /v1. */
export function getMeshDocsNav() {
  docsNav ??= getCollection('meshDocs').then(entries => build('/v1', 'v1', entries));
  return docsNav;
}

/** Mesh v0, kept under /docs as it was. */
export function getMeshLegacyNav() {
  legacyNav ??= getCollection('meshLegacy').then(entries => build('/docs', 'docs', entries));
  return legacyNav;
}
