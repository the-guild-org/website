/* eslint-disable no-console */
/**
 * Build-time guard for base-path correctness. When ASTRO_BASE_PATH is set,
 * every URL the browser requests must carry that prefix (the the-guild.dev
 * router strips it before proxying, so the worker itself serves un-prefixed
 * paths). Astro's `base` handles bundled assets, remark-base-path handles
 * content links, and components use withBase() — this script fails the build
 * if any root-absolute URL slipped through, pointing at the offending files.
 */
import { fileURLToPath } from "node:url";

const rawBase = process.env["ASTRO_BASE_PATH"]?.trim();
if (!rawBase || rawBase === "/") {
  console.log("ASTRO_BASE_PATH not set — skipping base path verification");
  process.exit(0);
}

const base = `/${rawBase.replace(/^\/+|\/+$/g, "")}`;
const distDirectory = fileURLToPath(new URL("../dist", import.meta.url));

const ATTR_PATTERN =
  /\s(?:href|src|poster|action|bundle-path|base-url)="(\/[^"]*)"/g;
const SRCSET_PATTERN = /\ssrcset="([^"]+)"/g;
const CSS_URL_PATTERN = /url\((['"]?)(\/[^)'"]+)\1\)/g;

function isUnprefixed(url: string) {
  if (!url.startsWith("/") || url.startsWith("//")) return false;
  return url !== base && !url.startsWith(`${base}/`);
}

const offenders = new Map<string, Set<string>>();
function report(file: string, url: string) {
  if (!offenders.has(file)) offenders.set(file, new Set());
  offenders.get(file)!.add(url);
}

for (const file of new Bun.Glob("**/*.{html,css}").scanSync({
  cwd: distDirectory,
  onlyFiles: true,
})) {
  const content = await Bun.file(`${distDirectory}/${file}`).text();

  if (file.endsWith(".css")) {
    for (const match of content.matchAll(CSS_URL_PATTERN)) {
      if (isUnprefixed(match[2]!)) report(file, match[2]!);
    }
    continue;
  }

  for (const match of content.matchAll(ATTR_PATTERN)) {
    if (isUnprefixed(match[1]!)) report(file, match[1]!);
  }
  // A doubled prefix means some absolute-URL builder joined an
  // already-base-prefixed path onto the site URL (e.g. og:image).
  if (content.includes(`${base}${base}/`)) {
    report(file, `${base}${base}/… (double prefix)`);
  }
  for (const match of content.matchAll(SRCSET_PATTERN)) {
    for (const candidate of match[1]!.split(",")) {
      const url = candidate.trim().split(/\s+/)[0];
      if (url && isUnprefixed(url)) report(file, url);
    }
  }
}

// _redirects stays fully un-prefixed on purpose: the router strips the
// prefix before the worker matches sources, and prefixes upstream Location
// headers itself — a prefixed destination would be redirected twice.
const redirects = Bun.file(`${distDirectory}/_redirects`);
if (await redirects.exists()) {
  for (const line of (await redirects.text()).split("\n")) {
    if (!line || line.startsWith("#")) continue;
    for (const path of line.split(/\s+/).slice(0, 2)) {
      if (path === base || path?.startsWith(`${base}/`)) {
        report("_redirects", path);
      }
    }
  }
}

if (offenders.size > 0) {
  console.error(`Found un-prefixed root-absolute URLs (base: ${base}):`);
  for (const [file, urls] of [...offenders.entries()].slice(0, 40)) {
    console.error(`  ${file}: ${[...urls].slice(0, 5).join(", ")}`);
  }
  console.error(`\n${offenders.size} files affected.`);
  process.exit(1);
}

console.log(`Base path ${base} verified: no un-prefixed URLs in the build`);
