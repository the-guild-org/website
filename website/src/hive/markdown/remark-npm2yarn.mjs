import convert from "npm-to-yarn";

const packageManagers = ["npm", "yarn", "pnpm", "bun"];

export function remarkNpm2Yarn() {
  return (tree) => {
    transformChildren(tree);
  };
}

function transformChildren(parent) {
  if (!Array.isArray(parent.children)) return;

  parent.children = parent.children.map((node) => {
    if (node.type === "code" && hasNpm2YarnMeta(node.meta)) {
      return createPackageManagerTabs(node);
    }

    transformChildren(node);
    return node;
  });
}

function hasNpm2YarnMeta(meta) {
  return typeof meta === "string" && /(?:^|\s)npm2yarn(?:\s|$)/.test(meta);
}

function createPackageManagerTabs(node) {
  const meta =
    node.meta.replace(/(?:^|\s)npm2yarn(?=\s|$)/, " ").trim() || null;

  return {
    type: "mdxJsxFlowElement",
    name: "PackageManagerTabs",
    attributes: [],
    children: packageManagers.map((manager, index) => ({
      type: "mdxJsxFlowElement",
      name: "PackageManagerTab",
      attributes:
        index === 0
          ? []
          : [{ type: "mdxJsxAttribute", name: "hidden", value: null }],
      children: [
        {
          ...node,
          lang: node.lang || "sh",
          meta,
          value: convert(node.value, manager),
        },
      ],
    })),
  };
}
