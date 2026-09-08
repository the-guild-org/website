import { getCollection } from 'astro:content';
import { buildDocsNav, type DocsNav, type MetaJson } from '../../docs/nav';
import { LEGACY_VERSIONS, type LegacyVersion } from './site';

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
    const rel = path.slice(index + marker.length);
    byDir.set(rel.replace(/(^|\/)meta\.json$/, ''), mod.default);
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

const cache = new Map<string, Promise<DocsNav>>();
function cached(key: string, factory: () => Promise<DocsNav>) {
  let nav = cache.get(key);
  if (!nav) {
    nav = factory();
    cache.set(key, nav);
  }
  return nav;
}

export function getYogaDocsNav() {
  return cached('docs', async () => build('/docs', 'docs', await getCollection('yogaDocs')));
}

export function getYogaTutorialNav() {
  return cached('tutorial', async () =>
    build('/tutorial', 'tutorial', await getCollection('yogaTutorial')),
  );
}

/** Entry ids in the legacy collection are "<version>/<path>"; the nav is per version. */
export function getYogaLegacyNav(version: LegacyVersion) {
  return cached(version, async () => {
    const entries = (await getCollection('yogaLegacy'))
      .filter(entry => entry.id.startsWith(`${version}/`))
      .map(entry => ({ ...entry, id: entry.id.slice(version.length + 1) }));
    return build(`/${version}`, version, entries);
  });
}

/** One package per page; folders follow the packages/ layout upstream. */
export function getYogaChangelogsNav() {
  return cached('changelogs', async () =>
    build('/changelogs', 'changelogs', await getCollection('yogaChangelogs')),
  );
}

export function isLegacyVersion(value: string): value is LegacyVersion {
  return (LEGACY_VERSIONS as readonly string[]).includes(value);
}
