/* eslint-disable no-console */
/**
 * Build-time guard for the Hive site's mount prefix. The Hive pages are
 * served under /graphql/hive of the unified site, and their content links are
 * prefixed by remark-base-path / withBase() — this script fails the build if
 * an un-prefixed Hive URL slipped through. Bundled assets legitimately live
 * at the shared /_astro root, so they are exempt.
 */
import { existsSync, globSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const base = "/graphql/hive";
const projectDirectory = fileURLToPath(new URL("../..", import.meta.url));
const distDirectory = fileURLToPath(new URL("../../dist", import.meta.url));
const hiveDistDirectory = `${distDirectory}/graphql/hive`;

const ATTR_PATTERN =
  /\s(?:href|src|poster|action|bundle-path|base-url)="(\/[^"]*)"/g;
const SRCSET_PATTERN = /\ssrcset="([^"]+)"/g;

function isUnprefixed(url: string) {
  if (!url.startsWith("/") || url.startsWith("//")) return false;
  if (url.startsWith("/_astro/")) return false;
  return url !== base && !url.startsWith(`${base}/`);
}

const offenders = new Map<string, Set<string>>();
function report(file: string, url: string) {
  if (!offenders.has(file)) offenders.set(file, new Set());
  offenders.get(file)!.add(url);
}

for (const file of globSync("**/*.html", { cwd: hiveDistDirectory })) {
  const content = readFileSync(`${hiveDistDirectory}/${file}`, "utf8");

  for (const match of content.matchAll(ATTR_PATTERN)) {
    if (isUnprefixed(match[1]!)) report(file, match[1]!);
  }
  // A doubled prefix means some absolute-URL builder joined an
  // already-base-prefixed path onto the site URL (e.g. og:image).
  if (content.includes(`${base}${base}/`)) {
    report(file, `${base}${base}/… (double prefix)`);
  }
  // Bundled assets live at the shared /_astro root — an absolute URL
  // placing them under the mount prefix (e.g. og:image) points nowhere.
  if (content.includes(`${base}/_astro/`)) {
    report(file, `${base}/_astro/… (assets are not under the mount prefix)`);
  }
  for (const match of content.matchAll(SRCSET_PATTERN)) {
    for (const candidate of match[1]!.split(",")) {
      const url = candidate.trim().split(/\s+/)[0];
      if (url && isUnprefixed(url)) report(file, url);
    }
  }
}

// Redirect destinations that point into Hive content must carry the mount
// prefix — an un-prefixed one would 404. Sources are legitimately
// un-prefixed (legacy URLs redirecting INTO Hive); main-site rules from
// website/public/_redirects are exempt entirely.
const mainSiteRedirects = new Set(
  (existsSync(`${projectDirectory}/public/_redirects`)
    ? readFileSync(`${projectDirectory}/public/_redirects`, "utf8").split("\n")
    : []
  ).map((line) => line.trim()),
);
if (existsSync(`${distDirectory}/_redirects`)) {
  for (const line of readFileSync(`${distDirectory}/_redirects`, "utf8").split("\n")) {
    if (!line.trim() || line.startsWith("#")) continue;
    if (mainSiteRedirects.has(line.trim())) continue;
    const destination = line.trim().split(/\s+/)[1];
    if (
      destination?.startsWith("/") &&
      destination !== base &&
      !destination.startsWith(`${base}/`)
    ) {
      report("_redirects", destination);
    }
  }
}

if (offenders.size > 0) {
  console.error(`Found un-prefixed URLs on Hive pages (base: ${base}):`);
  for (const [file, urls] of [...offenders.entries()].slice(0, 40)) {
    console.error(`  ${file}: ${[...urls].slice(0, 5).join(", ")}`);
  }
  console.error(`\n${offenders.size} files affected.`);
  process.exit(1);
}

console.log(`Base path ${base} verified: no un-prefixed URLs on Hive pages`);
