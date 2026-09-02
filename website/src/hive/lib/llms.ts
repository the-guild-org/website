import type { DocsEntry } from "./docs-markdown";
import { getDocsSlug } from "./docs-markdown";
import type { DocsNavNode, DocsNavPage } from "./docs-nav";

const SITE_URL = "https://the-guild.dev/graphql/hive";

function flattenPages(node: DocsNavNode): DocsNavPage[] {
  if (node.type === "page") return [node];

  const ownPage = node.href
    ? [{ href: node.href, title: node.title, type: "page" as const }]
    : [];
  return [...ownPage, ...node.children.flatMap(flattenPages)];
}

export function getLlmsText(entries: DocsEntry[], navigation: DocsNavNode[]) {
  const entriesByPath = new Map(
    entries.map((entry) => [
      `/docs${getDocsSlug(entry) ? `/${getDocsSlug(entry)}` : ""}`,
      entry,
    ]),
  );
  const link = (page: DocsNavPage) => {
    const data = entriesByPath.get(page.href)?.data as
      | { description?: string }
      | undefined;
    const description = data?.description ? `: ${data.description}` : "";
    return `- [${page.title}](${SITE_URL}${page.href}.md)${description}`;
  };
  const sections = navigation.flatMap((node) => [
    `## ${node.title}`,
    "",
    ...flattenPages(node).map(link),
    "",
  ]);

  return [
    "# Hive Platform",
    "",
    "> Hive Platform documentation",
    "",
    ...sections,
  ].join("\n");
}
