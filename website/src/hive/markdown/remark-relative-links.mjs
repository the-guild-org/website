import { existsSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const docsDirectory = fileURLToPath(
  new URL("../documentation/content/docs", import.meta.url),
);
const productUpdatesDirectory = fileURLToPath(
  new URL("../documentation/content/product-updates", import.meta.url),
);
const caseStudiesDirectory = fileURLToPath(
  new URL("../documentation/content/case-studies", import.meta.url),
);

export function remarkRelativeLinks() {
  return (tree, file) => {
    const filePath = file.path ?? file.history?.[0];
    if (!filePath) return;
    const collection = filePath.startsWith(productUpdatesDirectory)
      ? { base: "/product-updates", directory: productUpdatesDirectory }
      : filePath.startsWith(caseStudiesDirectory)
        ? { base: "/case-studies", directory: caseStudiesDirectory }
        : { base: "/docs", directory: docsDirectory };

    visit(tree, (node) => {
      if (
        node.type !== "link" ||
        (!node.url?.startsWith("./") && !node.url?.startsWith("../"))
      ) {
        return;
      }

      const [rawPath, hash] = node.url.split("#");
      const pathWithoutExtension = rawPath.replace(/\.mdx?$/, "");
      const resolved =
        resolveDocument(dirname(filePath), pathWithoutExtension) ??
        resolveDocument(collection.directory, pathWithoutExtension);
      if (!resolved) return;

      const path = relative(collection.directory, resolved)
        .replace(/\.mdx?$/, "")
        .replace(/(^|\/)index$/, "");
      node.url = `${collection.base}${path ? `/${path}` : ""}${hash ? `#${hash}` : ""}`;
    });
  };
}

function resolveDocument(directory, path) {
  for (const candidate of [
    `${path}.mdx`,
    `${path}.md`,
    `${path}/index.mdx`,
    `${path}/index.md`,
  ]) {
    const filePath = resolve(directory, candidate);
    if (existsSync(filePath)) return filePath;
  }
}

function visit(node, callback) {
  callback(node);
  node.children?.forEach((child) => visit(child, callback));
}
