/* eslint-disable no-console */
/**
 * Build-time SEO sweep over every rendered page in dist. Fails the build on:
 * missing head tags, placeholder or duplicate titles/descriptions, canonicals
 * that don't match the page's public URL (or og:url), relative social images,
 * stray noindex, missing <html lang>, h1 count != 1, internal links that
 * resolve to nothing, and indexable pages missing from the sitemaps.
 * Title/description length problems are reported as warnings only.
 */
import { existsSync, readFileSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const verbose =
  process.env["VERBOSE"] === "true" || process.argv.includes("--verbose");

const SITE = "https://the-guild.dev";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.resolve(__dirname, "../../dist");

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

// Paths the website-router rewrites to other targets at the edge.
const ROUTER_HANDLED_PATHS = new Set([
  "/graphql/hive/federation-gateway-performance",
  "/graphql/hive/federation-gateway-audit",
  "/graphql/hive/federation-playground",
]);

// Path prefixes served by other deployments through the website-router —
// links to them cannot resolve inside this dist.
// Keep in sync with packages/website-router/src/config.ts mappings.
const EXTERNAL_DEPLOYMENT_PREFIXES = [
  "/graphql/codegen",
  "/graphql/yoga-server",
  "/graphql/tools",
  "/graphql/mesh",
  "/graphql/scalars",
  "/graphql/inspector",
  "/graphql/apollo-angular",
  "/graphql/sofa-api",
  "/graphql/modules",
  "/graphql/envelop",
  "/graphql/eslint",
  "/graphql/config",
  "/graphql/stitching",
  "/graphql/ws",
  "/graphql/sse",
  "/openapi/fets",
  "/heltin",
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

interface ParsedHead {
  jsonldCount: number;
  jsonldInvalid: boolean;
  jsonldTypes: string[];
  parsed: Record<string, string | undefined>;
}

function parseHead(html: string): ParsedHead | null {
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

  const jsonldTypes: string[] = [];
  let jsonldInvalid = false;
  for (const match of head?.matchAll(
    /<script[^>]*type=("|')application\/ld\+json\1[^>]*>(.*?)<\/script>/gis,
  ) || []) {
    try {
      const data = JSON.parse(match[2] ?? "");
      const type = data?.["@type"];
      if (typeof type === "string") jsonldTypes.push(type);
    } catch {
      jsonldInvalid = true;
    }
  }

  return { jsonldCount: jsonldTypes.length, jsonldInvalid, jsonldTypes, parsed };
}

/** Public URL path a dist html file serves (build.format: "file"). */
function publicPath(relativePath: string): string {
  if (relativePath === "index.html") return "/";
  return `/${relativePath.replace(/\/index\.html$/, "").replace(/\.html$/, "")}`;
}

/** Whether an internal path resolves to a file in dist. */
function resolvesInDist(pathname: string): boolean {
  const decoded = decodeURI(pathname);
  return [
    `${OUTPUT_DIR}${decoded}`,
    `${OUTPUT_DIR}${decoded}.html`,
    `${OUTPUT_DIR}${decoded}/index.html`,
    ...(decoded === "/" ? [`${OUTPUT_DIR}/index.html`] : []),
  ].some((candidate) => existsSync(candidate));
}

/** Redirect sources from dist/_redirects: exact paths and /* splat prefixes. */
function loadRedirectSources(): { exact: Set<string>; prefixes: string[] } {
  const exact = new Set<string>();
  const prefixes: string[] = [];
  const file = `${OUTPUT_DIR}/_redirects`;
  if (!existsSync(file)) return { exact, prefixes };
  for (const line of readFileSync(file, "utf8").split("\n")) {
    if (!line.trim() || line.startsWith("#")) continue;
    const source = line.trim().split(/\s+/)[0];
    if (!source?.startsWith("/")) continue;
    if (source.endsWith("/*")) prefixes.push(source.slice(0, -1));
    else exact.add(source);
  }
  return { exact, prefixes };
}

function loadSitemapPaths(): Set<string> {
  const paths = new Set<string>();
  for (const sitemap of ["/sitemap-0.xml", "/graphql/hive/sitemap.xml"]) {
    const file = `${OUTPUT_DIR}${sitemap}`;
    if (!existsSync(file)) continue;
    for (const [, loc] of readFileSync(file, "utf8").matchAll(
      /<loc>([^<]+)<\/loc>/g,
    )) {
      if (!loc.startsWith(SITE)) continue;
      const pathname = decodeURI(loc.slice(SITE.length)) || "/";
      paths.add(pathname);
    }
  }
  return paths;
}

const redirectSources = loadRedirectSources();
const sitemapPaths = loadSitemapPaths();

const issues: string[] = [];
const warnings: string[] = [];
const titleOwners = new Map<string, string>();
const descriptionOwners = new Map<string, string>();
let scanned = 0;

for await (const filePath of walk(OUTPUT_DIR)) {
  // build.format "file": every page is <name>.html (the old directory
  // format's index.html filter silently reduced this check to zero pages).
  if (!filePath.endsWith(".html")) continue;
  if (path.basename(filePath) === "404.html") continue;
  // Static legal page copied verbatim from public/, not a rendered page.
  if (path.basename(filePath) === "privacy-policy.html") continue;

  scanned += 1;
  const html = await readFile(filePath, "utf8");

  const parsedHead = parseHead(html);
  if (!parsedHead) {
    issues.push(`${path.relative(OUTPUT_DIR, filePath)}: missing <head>`);
    continue;
  }
  const { jsonldCount, jsonldInvalid, jsonldTypes, parsed } = parsedHead;

  if (verbose) {
    console.log(filePath, { jsonldCount }, parsed);
  }

  const relativePath = path.relative(OUTPUT_DIR, filePath);
  const pagePath = publicPath(relativePath);

  for (const tag of REQUIRED_TAGS) {
    if (!parsed[tag]) {
      issues.push(`${relativePath}: missing ${tag}`);
    }
  }

  // Structured data is required where it is meaningful, and must parse:
  // BreadcrumbList across the Hive tree, Organization on the homepage,
  // BlogPosting on every blog post.
  if (jsonldInvalid) {
    issues.push(`${relativePath}: malformed application/ld+json`);
  }
  if (relativePath.startsWith("graphql/hive") && jsonldCount === 0) {
    issues.push(`${relativePath}: missing application/ld+json`);
  }
  if (relativePath === "index.html" && !jsonldTypes.includes("Organization")) {
    issues.push(`${relativePath}: missing Organization JSON-LD`);
  }
  if (
    /^blog\/[^/]+\.html$/.test(relativePath) &&
    !jsonldTypes.includes("BlogPosting")
  ) {
    issues.push(`${relativePath}: missing BlogPosting JSON-LD`);
  }

  const title = parsed["title"];
  const description = parsed["description"];

  // Placeholder titles — the audit's "Home (GraphQL-Codegen)" class.
  if (title && /^(home\b|untitled\b|index\b)|\bhome \(/i.test(title)) {
    issues.push(`${relativePath}: placeholder title "${title}"`);
  }

  // Duplicates make search engines pick a winner among the copies.
  if (title) {
    const owner = titleOwners.get(title);
    if (owner) issues.push(`${relativePath}: duplicate title (also on ${owner})`);
    else titleOwners.set(title, relativePath);
  }
  if (description) {
    const owner = descriptionOwners.get(description);
    if (owner)
      issues.push(`${relativePath}: duplicate description (also on ${owner})`);
    else descriptionOwners.set(description, relativePath);
  }

  // Length problems are advisory: Google truncates ~60/~160 characters.
  if (title && title.length > 70) {
    warnings.push(`${relativePath}: title is ${title.length} chars`);
  }
  if (description && (description.length < 40 || description.length > 170)) {
    warnings.push(
      `${relativePath}: description is ${description.length} chars`,
    );
  }

  // The canonical must be this page's own public URL and agree with og:url.
  // The main-site root keeps its trailing slash (new URL('/') shape).
  // Cross-domain canonicals are deliberate (syndicated posts declare their
  // original home); same-site ones must match this page's public URL.
  const canonical = parsed["link:canonical"];
  const expectedCanonical = `${SITE}${pagePath}`;
  const canonicalPath = canonical?.startsWith(SITE)
    ? canonical.slice(SITE.length)
    : undefined;
  const canonicalOnSiblingDeployment =
    canonicalPath !== undefined &&
    EXTERNAL_DEPLOYMENT_PREFIXES.some((prefix) =>
      canonicalPath.startsWith(`${prefix}/`),
    );
  if (
    canonical?.startsWith(SITE) &&
    !canonicalOnSiblingDeployment &&
    decodeURI(canonical) !== expectedCanonical &&
    decodeURI(canonical) !== `${expectedCanonical}/` &&
    !(pagePath === "/" && canonical === `${SITE}/`)
  ) {
    issues.push(
      `${relativePath}: canonical "${canonical}" != expected "${expectedCanonical}"`,
    );
  }
  if (canonical && parsed["og:url"] && canonical !== parsed["og:url"]) {
    issues.push(`${relativePath}: canonical and og:url disagree`);
  }

  // Social images must be absolute or previews silently break — and when
  // they live on this site, the file has to actually exist.
  for (const tag of ["og:image", "twitter:image"]) {
    const value = parsed[tag];
    if (!value) continue;
    if (!value.startsWith("https://")) {
      issues.push(`${relativePath}: ${tag} is not an absolute URL: ${value}`);
    } else if (
      value.startsWith(`${SITE}/`) &&
      !existsSync(`${OUTPUT_DIR}${decodeURI(new URL(value).pathname)}`)
    ) {
      issues.push(`${relativePath}: ${tag} points at a missing file: ${value}`);
    }
  }

  // A stray noindex can silently deindex a section.
  if (parsed["robots"]?.toLowerCase().includes("noindex")) {
    issues.push(`${relativePath}: noindex present`);
  }

  if (!/<html[^>]*\slang=/i.test(html)) {
    issues.push(`${relativePath}: <html> has no lang attribute`);
  }

  const h1Count = (html.match(/<h1[\s>]/gi) ?? []).length;
  if (h1Count !== 1) {
    issues.push(`${relativePath}: ${h1Count} <h1> elements`);
  }

  // Every internal link must resolve: to a dist file, a redirect rule, or a
  // path prefix another deployment serves through the router.
  const seenHrefs = new Set<string>();
  for (const [, href] of html.matchAll(/\shref="(\/[^"#?]*)[^"]*"/g)) {
    if (!href || href.startsWith("//") || seenHrefs.has(href)) continue;
    seenHrefs.add(href);
    const target = href !== "/" ? href.replace(/\/$/, "") : href;
    // The pagefind bundle is generated by a later postbuild step.
    if (target.startsWith("/graphql/hive/pagefind/")) continue;
    if (ROUTER_HANDLED_PATHS.has(target)) continue;
    if (resolvesInDist(target)) continue;
    if (redirectSources.exact.has(target)) continue;
    if (redirectSources.prefixes.some((prefix) => target.startsWith(prefix)))
      continue;
    if (
      EXTERNAL_DEPLOYMENT_PREFIXES.some(
        (prefix) => target === prefix || target.startsWith(`${prefix}/`),
      )
    )
      continue;
    issues.push(`${relativePath}: internal link resolves to nothing: ${href}`);
  }

  // Reverse sitemap parity: verify-sitemaps proves sitemap URLs have files;
  // this proves every indexable page is in a sitemap.
  if (!sitemapPaths.has(pagePath)) {
    issues.push(`${relativePath}: not listed in any sitemap`);
  }
}

if (warnings.length > 0) {
  console.warn(`SEO advisories (${warnings.length}, not failing the build):`);
  for (const warning of warnings.slice(0, verbose ? warnings.length : 15)) {
    console.warn(`  ${warning}`);
  }
}

if (issues.length > 0) {
  const shown = issues.slice(0, verbose ? issues.length : 50);
  throw new Error(
    `SEO check failed with ${issues.length} issues across ${scanned} pages.\n${shown.join("\n")}`,
  );
}

console.log(
  `SEO check passed for ${scanned} prerendered pages (${warnings.length} advisories).`,
);
