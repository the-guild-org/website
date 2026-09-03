import { describe, expect, test } from "vitest";

import { remarkNpm2Yarn } from "./remark-npm2yarn.mjs";

describe("remarkNpm2Yarn", () => {
  test("converts npm2yarn code blocks into package manager tabs", () => {
    const tree = {
      type: "root",
      children: [
        {
          type: "code",
          lang: "sh",
          meta: 'npm2yarn title="Install dependencies"',
          value: "npm install -D typescript",
        },
      ],
    };

    remarkNpm2Yarn()(tree);

    const tabs = tree.children[0];
    expect(tabs.name).toBe("PackageManagerTabs");
    expect(tabs.children.map((tab) => tab.children[0].value)).toEqual([
      "npm install -D typescript",
      "yarn add --dev typescript",
      "pnpm add -D typescript",
      "bun add --dev typescript",
    ]);
    expect(tabs.children.every((tab) => tab.name === "PackageManagerTab")).toBe(
      true,
    );
    expect(tabs.children.map((tab) => tab.attributes)).toEqual([
      [],
      [{ type: "mdxJsxAttribute", name: "hidden", value: null }],
      [{ type: "mdxJsxAttribute", name: "hidden", value: null }],
      [{ type: "mdxJsxAttribute", name: "hidden", value: null }],
    ]);
    expect(
      tabs.children.every(
        (tab) => tab.children[0].meta === 'title="Install dependencies"',
      ),
    ).toBe(true);
  });

  test("leaves regular code blocks unchanged", () => {
    const code = {
      type: "code",
      lang: "sh",
      meta: 'title="Install dependencies"',
      value: "npm install typescript",
    };
    const tree = { type: "root", children: [code] };

    remarkNpm2Yarn()(tree);

    expect(tree.children[0]).toBe(code);
  });
});
