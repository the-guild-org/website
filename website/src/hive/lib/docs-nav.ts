import { getCollection } from "astro:content";

interface MetaJson {
  icon?: string;
  pages?: string[];
  root?: boolean;
  title?: string;
}

export interface DocsNavPage {
  href: string;
  title: string;
  type: "page";
}

export interface DocsNavFolder {
  children: DocsNavNode[];
  href?: string;
  icon?: string;
  root?: boolean;
  title: string;
  type: "folder";
}

export type DocsNavNode = DocsNavFolder | DocsNavPage;

interface DocsNav {
  items: DocsNavPage[];
  tree: DocsNavNode[];
}

const metaModules = import.meta.glob<{ default: MetaJson }>(
  "../documentation/content/docs/**/meta.json",
  { eager: true },
);

function dirOfMetaPath(fullPath: string) {
  const marker = "/content/docs/";
  const rel = fullPath.slice(fullPath.indexOf(marker) + marker.length);
  return rel.replace(/(^|\/)meta\.json$/, "");
}

const metaByDir = new Map<string, MetaJson>();
for (const [path, mod] of Object.entries(metaModules)) {
  metaByDir.set(dirOfMetaPath(path), mod.default);
}

function toSlug(id: string) {
  return id.replace(/(^|\/)index$/, "").replace(/\.(md|mdx)$/, "");
}

function hrefToSlug(href: string) {
  return href.replace(/^\/docs\/?/, "").replace(/\/$/, "");
}

function parseBracket(entry: string) {
  const match = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(entry);
  if (!match) return undefined;
  return { href: match[2]!, title: match[1]! };
}

function humanize(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function iconRawSvg(iconName: string) {
  const fileName = iconName
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase();
  return iconModules[`../design-system/icons/${fileName}.svg`];
}

const iconModules = import.meta.glob<string>(
  "../design-system/icons/*.svg",
  {
    eager: true,
    import: "default",
    query: "?raw",
  },
);

function analyzeDir(dir: string, slugs: Set<string>) {
  const prefix = dir ? `${dir}/` : "";
  const folders = new Set<string>();
  const files = new Set<string>();
  let hasOwnIndex = false;

  for (const slug of slugs) {
    if (slug === dir) {
      hasOwnIndex = true;
      continue;
    }
    if (!slug.startsWith(prefix)) continue;
    const rest = slug.slice(prefix.length);
    const slashIndex = rest.indexOf("/");
    if (slashIndex === -1) files.add(rest);
    else folders.add(rest.slice(0, slashIndex));
  }

  return { files, folders, hasOwnIndex };
}

function page(slug: string, title: string): DocsNavPage {
  return {
    href: `/docs${slug ? `/${slug}` : ""}`,
    title,
    type: "page",
  };
}

function resolveDir(
  dir: string,
  slugs: Set<string>,
  titles: Map<string, string>,
): DocsNavFolder {
  const { files, folders, hasOwnIndex } = analyzeDir(dir, slugs);
  const meta = metaByDir.get(dir);
  const pages = meta?.pages ?? ["..."];
  const children: DocsNavNode[] = [];
  const referenced = new Set<string>();
  const hasExplicitIndex = pages.some((entry) => {
    if (entry === "index") return true;
    const bracket = parseBracket(entry);
    return bracket && hrefToSlug(bracket.href) === dir;
  });

  for (const entry of pages) {
    if (entry === "..." || entry === "index") continue;
    const bracket = parseBracket(entry);
    if (bracket) {
      const slug = hrefToSlug(bracket.href);
      const prefix = dir ? `${dir}/` : "";
      const rest = slug.startsWith(prefix)
        ? slug.slice(prefix.length)
        : undefined;
      const top = rest?.split("/")[0];
      if (top) referenced.add(top);
    } else {
      referenced.add(entry);
    }
  }

  const emitChild = (name: string) => {
    const slug = dir ? `${dir}/${name}` : name;
    if (folders.has(name)) children.push(resolveDir(slug, slugs, titles));
    else if (files.has(name))
      children.push(page(slug, titles.get(slug) ?? humanize(name)));
  };

  for (const entry of pages) {
    if (entry === "...") {
      const remaining = [...folders, ...files]
        .filter((name) => !referenced.has(name))
        .sort();
      for (const name of remaining) emitChild(name);
      continue;
    }
    if (entry === "index") {
      if (hasOwnIndex)
        children.push(
          page(
            dir,
            titles.get(dir) ??
              humanize(dir.split("/").at(-1) || "Introduction"),
          ),
        );
      continue;
    }
    const bracket = parseBracket(entry);
    if (bracket) {
      const slug = hrefToSlug(bracket.href);
      const prefix = dir ? `${dir}/` : "";
      const rest = slug.startsWith(prefix) ? slug.slice(prefix.length) : "";
      if (rest && !rest.includes("/") && folders.has(rest)) {
        const folder = resolveDir(slug, slugs, titles);
        folder.title = bracket.title;
        children.push(folder);
      } else if (slugs.has(slug)) {
        children.push(page(slug, bracket.title));
      }
      continue;
    }
    emitChild(entry);
  }

  const name = dir.split("/").at(-1) || "Documentation";
  return {
    children,
    href:
      hasOwnIndex && !hasExplicitIndex
        ? `/docs${dir ? `/${dir}` : ""}`
        : undefined,
    icon: meta?.icon ? iconRawSvg(meta.icon) : undefined,
    root: meta?.root,
    title: meta?.title ?? titles.get(dir) ?? humanize(name),
    type: "folder",
  };
}

function flatten(nodes: DocsNavNode[]): DocsNavPage[] {
  const items: DocsNavPage[] = [];
  for (const node of nodes) {
    if (node.type === "page") items.push(node);
    else {
      if (node.href) items.push(page(hrefToSlug(node.href), node.title));
      items.push(...flatten(node.children));
    }
  }
  return items;
}

let cached: DocsNav | undefined;

export async function getDocsNav(): Promise<DocsNav> {
  if (cached) return cached;

  const entries = await getCollection("docs");
  const slugs = new Set(entries.map((entry) => toSlug(entry.id)));
  const titles = new Map(
    entries.map((entry) => {
      const data = entry.data as { sidebarTitle?: string; title?: string };
      return [
        toSlug(entry.id),
        data.sidebarTitle ??
          data.title ??
          humanize(entry.id.split("/").at(-1) ?? entry.id),
      ];
    }),
  );
  const tree = resolveDir("", slugs, titles).children;

  cached = { items: flatten(tree), tree };
  return cached;
}
