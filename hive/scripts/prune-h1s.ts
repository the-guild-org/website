import { readdir, readFile, writeFile } from "fs/promises";
import { join } from "path";

/**
 * Recursively find all .mdx files in a directory
 */
async function findMdxFiles(dir: string): Promise<string[]> {
  const files: string[] = [];
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip node_modules and hidden directories
      if (!entry.name.startsWith(".") && entry.name !== "node_modules") {
        files.push(...(await findMdxFiles(fullPath)));
      }
    } else if (entry.name.endsWith(".mdx")) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Remove only the first h1 heading (# ) from markdown content
 * Preserves other heading levels and all other h1s
 */
function pruneH1s(content: string): string {
  // Replace only the first h1 heading at the start of a line
  // This regex matches the first occurrence of # followed by space
  return content.replace(/^#{1}\s+.+$/m, "").replace(/^\n+/, "");
}

/**
 * Main function to process all .mdx files
 */
async function main() {
  const workspaceRoot = process.cwd();

  console.log(`Scanning for .mdx files in ${workspaceRoot}...`);

  const mdxFiles = await findMdxFiles(workspaceRoot);

  console.log(`Found ${mdxFiles.length} .mdx files`);
  console.log("\nFiles to be processed:");
  mdxFiles.forEach((file) => {
    console.log(`  - ${file}`);
  });

  console.log("\n--- DRY RUN MODE ---");
  console.log("To execute, remove the 'dryRun' flag below\n");

  const dryRun = false;
  let filesModified = 0;
  let h1sRemoved = 0;

  for (const file of mdxFiles) {
    const content = await readFile(file, "utf-8");
    const originalContent = content;

    const processed = pruneH1s(content);

    // Check if first h1 would be removed
    const hasFirstH1 = /^#{1}\s+.+$/m.test(originalContent);

    if (originalContent !== processed && hasFirstH1) {
      filesModified++;
      h1sRemoved += 1;

      console.log(`${file}`);
      console.log(`  → Removing first h1 heading`);

      if (!dryRun) {
        await writeFile(file, processed, "utf-8");
      }
    }
  }

  console.log(
    `\n${dryRun ? "[DRY RUN] Would have modified" : "Modified"} ${filesModified} file(s)`,
  );
  console.log(
    `${dryRun ? "[DRY RUN] Would have removed" : "Removed"} ${h1sRemoved} first h1 heading(s)`,
  );

  if (dryRun) {
    console.log("\nTo apply changes, set 'dryRun = false' in the script");
  }
}

main().catch(console.error);
