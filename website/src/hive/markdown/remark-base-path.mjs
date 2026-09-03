/**
 * Prefixes root-absolute link/image URLs in Hive content with the site's
 * mount prefix (/graphql/hive), covering both Markdown syntax and JSX
 * attributes like `<CallToAction href="/docs/...">`. Runs after
 * remark-relative-links, which resolves relative content links to
 * root-absolute ones.
 */
const URL_ATTRIBUTES = new Set(["href", "src"]);

export function remarkBasePath() {
  const base = "/graphql/hive";

  const prefix = (url) => {
    if (!base || typeof url !== "string") return url;
    if (!url.startsWith("/") || url.startsWith("//")) return url;
    if (url === base || url.startsWith(`${base}/`)) return url;
    return `${base}${url}`;
  };

  return (tree) => {
    if (!base) return;

    visit(tree, (node) => {
      if (
        node.type === "link" ||
        node.type === "image" ||
        node.type === "definition"
      ) {
        node.url = prefix(node.url);
        return;
      }

      if (
        node.type === "mdxJsxFlowElement" ||
        node.type === "mdxJsxTextElement"
      ) {
        for (const attribute of node.attributes ?? []) {
          if (
            attribute.type === "mdxJsxAttribute" &&
            URL_ATTRIBUTES.has(attribute.name) &&
            typeof attribute.value === "string"
          ) {
            attribute.value = prefix(attribute.value);
          }
        }
      }
    });
  };
}

function visit(node, visitor) {
  visitor(node);
  if (node.children) {
    for (const child of node.children) visit(child, visitor);
  }
}
