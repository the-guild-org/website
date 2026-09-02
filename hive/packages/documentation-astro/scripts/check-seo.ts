/* eslint-disable no-console */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const verbose =
  process.env["VERBOSE"] === "true" || process.argv.includes("--verbose");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.resolve(__dirname, "../dist");
const REQUIRED_TAGS = [
  "title",
  "link:canonical",
  "description",
  "og:title",
  "og:description",
  "og:url",
  "og:site_name",
  "og:locale",
  "og:image",
  "og:type",
  "twitter:card",
  "twitter:site",
  "twitter:creator",
  "twitter:title",
  "twitter:description",
  "twitter:image",
];

async function* walk(dir: string): AsyncGenerator<string> {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(fullPath);
      continue;
    }
    if (entry.isFile()) {
      yield fullPath;
    }
  }
}

function getAttributes(attrs: string): Record<string, string | undefined> {
  return Object.fromEntries(
    [...attrs.matchAll(/(\w+)=("|')(.*?)\2/gis)].map((match) => [
      match[1]?.toLowerCase(),
      match[3],
    ]),
  );
}

function parseHead(
  html: string,
): { jsonldCount: number; parsed: Record<string, string | undefined> } | null {
  const headMatch = html.match(/<head[^>]*>(.*?)<\/head>/is);
  if (!headMatch) return null;

  const head = headMatch[1];
  const parsed: Record<string, string | undefined> = {};

  const titleMatch = head?.match(/<title>(.*?)<\/title>/is);
  parsed["title"] = titleMatch?.[1]?.trim();

  for (const match of head?.matchAll(/<link\s+([^>]+?)\s*\/?>/gis) || []) {
    if (!match[1]) continue;
    const attrs = getAttributes(match[1]);
    if (attrs["rel"] && attrs["href"]) {
      parsed[`link:${attrs["rel"]}`] = attrs["href"];
    }
  }

  for (const match of head?.matchAll(/<meta\s+([^>]+?)\s*\/?>/gis) || []) {
    if (!match[1]) continue;
    const attrs = getAttributes(match[1]);
    const key = attrs["name"] ?? attrs["property"];
    if (key) {
      parsed[key] = attrs["content"];
    }
  }

  return {
    jsonldCount: [
      ...(head?.matchAll(/<script[^>]*type=("|')application\/ld\+json\1/gi) ||
        []),
    ].length,
    parsed,
  };
}

const issues = [];
let scanned = 0;

for await (const filePath of walk(OUTPUT_DIR)) {
  if (!filePath.endsWith("index.html")) continue;
  if (path.basename(filePath) === "_shell.html") continue;

  scanned += 1;
  const html = await readFile(filePath, "utf8");

  const { jsonldCount, parsed } = parseHead(html) ?? {
    jsonldCount: 0,
    parsed: {},
  };

  if (verbose) {
    console.log(filePath, { jsonldCount }, parsed);
  }

  const relativePath = path.relative(OUTPUT_DIR, filePath);

  if (!parsed) {
    issues.push(`${relativePath}: missing <head>`);
    continue;
  }

  for (const tag of REQUIRED_TAGS) {
    if (!parsed[tag]) {
      issues.push(`${relativePath}: missing ${tag}`);
    }
  }

  if (jsonldCount < 1) {
    issues.push(`${relativePath}: missing application/ld+json`);
  }
}

if (issues.length > 0) {
  const error = new Error(
    `SEO check failed for ${issues.length} tag issues across ${scanned} pages.\n${issues.join("\n")}`,
  );
  throw error;
}

console.log(`SEO check passed for ${scanned} prerendered pages.`);
