import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { routeRules } from "../../src/hive/documentation/redirects.ts";

const outputDirectory = fileURLToPath(new URL("../../dist", import.meta.url));
const outputFile = fileURLToPath(
  new URL("../../dist/_redirects", import.meta.url),
);

/**
 * The Hive site is mounted at /graphql/hive of the unified deployment, and
 * Cloudflare Pages only reads root-level _redirects — so every rule is
 * written with the mount prefix. Redirect sources/destinations in
 * redirects.ts stay un-prefixed (they predate the merge and read naturally).
 */
const PREFIX = "/graphql/hive";
const prefixPath = (path: string) =>
  path.startsWith("/") && !path.startsWith(PREFIX) ? `${PREFIX}${path}` : path;

/**
 * Redirects that only apply to the Astro deployment: the old site serves raw
 * per-page MDX at /llms.mdx/docs/*, which this site replaces with /docs/*.md.
 */
const astroOnlyRedirects = [
  {
    source: `${PREFIX}/llms.mdx/docs/*`,
    destination: `${PREFIX}/docs/:splat.md`,
    status: 301,
  },
];

const redirects = [
  ...Object.entries(routeRules).map(([source, rule]) => {
    if (!rule.redirect || typeof rule.redirect === "string") {
      throw new Error(`Expected ${source} to contain a redirect object`);
    }

    return {
      source: prefixPath(source.replace(/\/\*\*$/, "/*")),
      destination: prefixPath(rule.redirect.to),
      status: rule.redirect.status,
    };
  }),
  ...astroOnlyRedirects,
].sort(
  (a, b) => Number(a.source.endsWith("/*")) - Number(b.source.endsWith("/*")),
);

const MARKER =
  "# Generated from website/src/hive/documentation/redirects.ts. Do not edit manually.";

const hiveBlock = [
  MARKER,
  ...redirects.map(
    ({ source, destination, status }) => `${source} ${destination} ${status}`,
  ),
  "",
].join("\n");

// astro build copies website/public/_redirects (main-site rules) into dist;
// keep it and append the Hive block after it. Stripping from the marker
// makes re-runs idempotent.
const existing = await readFile(outputFile, "utf8").catch(() => "");
const mainSiteRules = existing.split(MARKER)[0]!.replace(/\n+$/, "");
const contents = mainSiteRules ? `${mainSiteRules}\n\n${hiveBlock}` : hiveBlock;

await mkdir(outputDirectory, { recursive: true });
await writeFile(outputFile, contents);

console.log(`Generated ${redirects.length} redirects in ${outputFile}`);
