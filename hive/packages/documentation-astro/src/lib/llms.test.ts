import { describe, expect, test } from "bun:test";

import type { DocsEntry } from "./docs-markdown";
import type { DocsNavNode } from "./docs-nav";
import { getLlmsText } from "./llms";

describe("getLlmsText", () => {
  test("generates an ordered index of absolute Markdown links", () => {
    const entries = [
      {
        data: { description: "Gateway documentation", title: "Gateway" },
        id: "gateway/index",
      },
      { data: { title: "Introduction" }, id: "index" },
    ] as DocsEntry[];
    const navigation = [
      { href: "/docs", title: "Introduction", type: "page" },
      {
        children: [
          { href: "/docs/gateway", title: "Getting Started", type: "page" },
        ],
        title: "Hive Gateway",
        type: "folder",
      },
    ] satisfies DocsNavNode[];

    const output = getLlmsText(entries, navigation);

    expect(output.startsWith("# Hive Platform\n")).toBe(true);
    expect(output).toContain("## Introduction\n");
    expect(output).toContain("## Hive Gateway\n");
    expect(output).toContain(
      "- [Introduction](https://the-guild.dev/graphql/hive/docs.md)",
    );
    expect(output).toContain(
      "- [Getting Started](https://the-guild.dev/graphql/hive/docs/gateway.md): Gateway documentation",
    );
    expect(output.indexOf("## Introduction")).toBeLessThan(
      output.indexOf("## Hive Gateway"),
    );
  });
});
