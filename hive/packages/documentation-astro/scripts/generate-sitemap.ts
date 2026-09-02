import { fileURLToPath } from "node:url";

const SITE_URL = "https://the-guild.dev/graphql/hive";
const distDirectory = fileURLToPath(new URL("../dist", import.meta.url));
const repoRoot = fileURLToPath(new URL("../../..", import.meta.url));

/**
 * Last-modified dates per URL, derived from the git history of the content
 * files in one pass. Pages without a content file (landing pages, tag pages)
 * simply omit <lastmod>.
 */
function contentPathToUrlPath(file: string): string | undefined {
  const match = file.match(
    /^(?:hive\/)?packages\/documentation\/content\/(docs|blog|product-updates|case-studies)\/(.+?)\.(md|mdx)$/,
  );
  if (!match) return undefined;
  const [, collection, rawPath] = match;
  const path = rawPath!.replace(/(^|\/)index$/, "");
  const prefix = collection === "docs" ? "/docs" : `/${collection}`;
  return path ? `${prefix}/${path}` : prefix;
}

function gitLastModified(): Map<string, string> {
  const dates = new Map<string, string>();
  const proc = Bun.spawnSync(
    [
      "git",
      "log",
      "--format=commit:%cI",
      "--name-only",
      "--",
      "packages/documentation/content",
    ],
    { cwd: repoRoot, stdout: "pipe" },
  );
  if (proc.exitCode !== 0) return dates;

  let currentDate = "";
  for (const line of proc.stdout.toString().split("\n")) {
    if (line.startsWith("commit:")) {
      currentDate = line.slice("commit:".length).slice(0, 10);
      continue;
    }
    if (!line) continue;
    const urlPath = contentPathToUrlPath(line);
    if (urlPath && !dates.has(urlPath)) dates.set(urlPath, currentDate);
  }
  return dates;
}

const lastModified = gitLastModified();

const pages = [
  ...new Bun.Glob("**/index.html").scanSync({
    cwd: distDirectory,
    onlyFiles: true,
  }),
]
  .map((file) => {
    const path =
      file === "index.html" ? "" : `/${file.replace(/\/index\.html$/, "")}`;
    return { lastmod: lastModified.get(path), path };
  })
  .sort((a, b) => a.path.localeCompare(b.path));

const urls = pages
  .map(({ lastmod, path }) => {
    // Percent-encode: tag pages contain spaces, invalid raw inside <loc>.
    const loc = `${SITE_URL}${encodeURI(path)}`;
    return lastmod
      ? `  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod></url>`
      : `  <url><loc>${loc}</loc></url>`;
  })
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

await Bun.write(new URL("../dist/sitemap.xml", import.meta.url), sitemap);
console.log(
  `Generated sitemap.xml with ${pages.length} URLs (${pages.filter((p) => p.lastmod).length} with lastmod)`,
);
