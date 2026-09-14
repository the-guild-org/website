/**
 * Package changelogs as content pages. A monorepo's packages/ tree carries one
 * CHANGELOG.md per published package (changesets writes them); each becomes a
 * Markdown page at the package's path under packages/, so packages/plugins/jwt
 * is served at /changelogs/plugins/jwt. Shared by the fetch scripts of every
 * site that renders per-package changelogs (Yoga, Codegen, Mesh, Inspector);
 * the registry products render a single file through `changelogBody`.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';

/**
 * A changelog as a page body. The page title comes from the frontmatter, so a
 * leading package-name h1 goes; release headings that some changelog
 * generators write as h1 (`# [2.6.0](...)`) become h2 so the page keeps a
 * single h1. Code fences are left alone.
 */
export function changelogBody(markdown: string): string {
  const lines = markdown.trim().split('\n');
  if (/^ {0,3}# /.test(lines[0] ?? '') && !/\d+\.\d+/.test(lines[0])) lines.shift();
  let fence: string | null = null;
  return lines
    .map(line => {
      const opening = line.match(/^\s*(`{3,}|~{3,})/);
      if (opening) {
        if (fence === null) fence = opening[1];
        else if (line.trim().startsWith(fence)) fence = null;
        return line;
      }
      // Up to three leading spaces still make a heading.
      return fence === null ? line.replace(/^( {0,3})# /, '$1## ') : line;
    })
    .join('\n')
    .trim();
}

/**
 * Writes one page per published package under `packagesDir` into `outputDir`,
 * keeping the packages/ layout (packages/plugins/jwt → plugins/jwt.md).
 * Packages without a CHANGELOG.md, without a name, or marked private are
 * skipped. Returns how many pages were written.
 */
export function collectChangelogs(packagesDir: string, outputDir: string): number {
  let count = 0;
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (!entry.isDirectory() || entry.name === 'node_modules' || entry.name === 'dist') continue;
      const packageDir = join(dir, entry.name);
      const changelog = join(packageDir, 'CHANGELOG.md');
      const manifest = join(packageDir, 'package.json');
      if (existsSync(changelog) && existsSync(manifest)) {
        const { name, private: isPrivate } = JSON.parse(readFileSync(manifest, 'utf8')) as {
          name?: string;
          private?: boolean;
        };
        if (name && !isPrivate) {
          const target = join(outputDir, `${relative(packagesDir, packageDir)}.md`);
          mkdirSync(dirname(target), { recursive: true });
          const body =
            changelogBody(readFileSync(changelog, 'utf8')) || 'No published releases yet.';
          writeFileSync(
            target,
            `---\ntitle: ${JSON.stringify(name)}\ndescription: ${JSON.stringify(`Changelog for ${name}: every release with its changes and the pull requests behind them.`)}\n---\n\n${body}\n`,
          );
          count++;
        }
      }
      walk(packageDir);
    }
  };
  walk(packagesDir);
  return count;
}
