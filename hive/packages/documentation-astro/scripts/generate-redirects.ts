import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { routeRules } from "../../documentation/redirects.ts";

const outputDirectory = fileURLToPath(new URL("../dist", import.meta.url));
const outputFile = fileURLToPath(
  new URL("../dist/_redirects", import.meta.url),
);

/**
 * Redirects that only apply to the Astro deployment: the old site serves raw
 * per-page MDX at /llms.mdx/docs/*, which this site replaces with /docs/*.md.
 */
const astroOnlyRedirects = [
  {
    source: "/llms.mdx/docs/*",
    destination: "/docs/:splat.md",
    status: 301,
  },
];

const redirects = [
  ...Object.entries(routeRules).map(([source, rule]) => {
    if (!rule.redirect || typeof rule.redirect === "string") {
      throw new Error(`Expected ${source} to contain a redirect object`);
    }

    return {
      source: source.replace(/\/\*\*$/, "/*"),
      destination: rule.redirect.to,
      status: rule.redirect.status,
    };
  }),
  ...astroOnlyRedirects,
].sort(
  (a, b) => Number(a.source.endsWith("/*")) - Number(b.source.endsWith("/*")),
);

const contents = [
  "# Generated from packages/documentation/redirects.ts. Do not edit manually.",
  ...redirects.map(
    ({ source, destination, status }) => `${source} ${destination} ${status}`,
  ),
  "",
].join("\n");

await mkdir(outputDirectory, { recursive: true });
await writeFile(outputFile, contents);

console.log(`Generated ${redirects.length} redirects in ${outputFile}`);
