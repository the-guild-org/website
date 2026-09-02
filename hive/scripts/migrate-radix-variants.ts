#!/usr/bin/env bun
/**
 * Codemod: Migrate rdx-* custom variants to Tailwind 4 built-in data-[...] syntax
 *
 * Usage:
 *   bun scripts/migrate-radix-variants.ts [--dry-run] [path]
 *
 * Examples:
 *   bun scripts/migrate-radix-variants.ts --dry-run packages/
 *   bun scripts/migrate-radix-variants.ts src/
 */

import { Glob } from "bun";

const REPLACEMENTS: [RegExp, string][] = [
  // State variants: rdx-state-{value}: → data-[state={value}]:
  [/\brdx-state-([a-z-]+):/g, "data-[state=$1]:"],

  // Boolean attribute variants: rdx-{attr}: → data-{attr}:
  [/\brdx-disabled:/g, "data-disabled:"],
  [/\brdx-highlighted:/g, "data-highlighted:"],
  [/\brdx-placeholder:/g, "data-placeholder:"],

  // Side variants: rdx-side-{value}: → data-[side={value}]:
  [/\brdx-side-(top|bottom|left|right):/g, "data-[side=$1]:"],

  // Orientation variants: rdx-orientation-{value}: → data-[orientation={value}]:
  [/\brdx-orientation-(horizontal|vertical):/g, "data-[orientation=$1]:"],

  // Group variants: group-rdx-state-{value}: → group-data-[state={value}]:
  [/\bgroup-rdx-state-([a-z-]+):/g, "group-data-[state=$1]:"],

  // Peer variants: peer-rdx-state-{value}: → peer-data-[state={value}]:
  [/\bpeer-rdx-state-([a-z-]+):/g, "peer-data-[state=$1]:"],
];

async function migrateFile(
  filePath: string,
  dryRun: boolean,
): Promise<{ changed: boolean; changes: string[] }> {
  const content = await Bun.file(filePath).text();
  let newContent = content;
  const changes: string[] = [];

  for (const [pattern, replacement] of REPLACEMENTS) {
    const matches = content.match(pattern);
    if (matches) {
      for (const match of matches) {
        const replaced = match.replace(pattern, replacement);
        changes.push(`  ${match} → ${replaced}`);
      }
      newContent = newContent.replace(pattern, replacement);
    }
  }

  if (changes.length > 0 && !dryRun) {
    await Bun.write(filePath, newContent);
  }

  return { changed: changes.length > 0, changes };
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const pathArg = args.find((a) => !a.startsWith("--")) || ".";

  const glob = new Glob("**/*.{tsx,jsx,ts,js,css,html}");
  const files: string[] = [];

  for await (const file of glob.scan({
    cwd: pathArg,
    absolute: true,
    onlyFiles: true,
  })) {
    // Skip node_modules and dist
    if (file.includes("node_modules") || file.includes("/dist/")) continue;
    files.push(file);
  }

  console.log(`Scanning ${files.length} files...${dryRun ? " (dry run)" : ""}`);

  let totalChanges = 0;
  for (const file of files) {
    const { changed, changes } = await migrateFile(file, dryRun);
    if (changed) {
      console.log(`\n${file}:`);
      for (const change of changes) {
        console.log(change);
      }
      totalChanges += changes.length;
    }
  }

  console.log(
    `\n${totalChanges} replacement(s) ${dryRun ? "would be made" : "made"}.`,
  );

  if (dryRun && totalChanges > 0) {
    console.log("\nRun without --dry-run to apply changes.");
  }
}

main().catch(console.error);
