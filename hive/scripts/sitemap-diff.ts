#!/usr/bin/env node
/**
 * Sitemap Diff Tool
 *
 * Compares sitemaps from old and new repos to verify migration completeness.
 *
 * Usage:
 *   ./scripts/sitemap-diff.ts                      # Compare default sitemaps
 *   ./scripts/sitemap-diff.ts --old <path>         # Specify old sitemap path
 *   ./scripts/sitemap-diff.ts --new <path>         # Specify new sitemap path
 *   ./scripts/sitemap-diff.ts --json               # Output as JSON
 *   ./scripts/sitemap-diff.ts --save <file>        # Save report to file
 */

import { readFileSync, existsSync, writeFileSync } from "fs";
import { resolve } from "path";

interface SitemapEntry {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
}

interface DiffReport {
  summary: {
    oldTotal: number;
    newTotal: number;
    missingFromNew: number;
    extraInNew: number;
    matching: number;
  };
  missingFromNew: SitemapEntry[];
  extraInNew: SitemapEntry[];
  changed: Array<{
    url: string;
    old: SitemapEntry;
    new: SitemapEntry;
    differences: string[];
  }>;
}

const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};

function parseArgs(): {
  oldPath: string;
  newPath: string;
  json: boolean;
  savePath?: string;
} {
  const args = process.argv.slice(2);
  let oldPath = ".context/hive-console/dist/sitemap.xml";
  let newPath = "packages/documentation/dist/sitemap.xml";
  let json = false;
  let savePath: string | undefined;

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--old":
        oldPath = args[++i]!;
        break;
      case "--new":
        newPath = args[++i]!;
        break;
      case "--json":
        json = true;
        break;
      case "--save":
        savePath = args[++i];
        break;
      case "--help":
      case "-h":
        console.log(`
${colors.bright}Sitemap Diff Tool${colors.reset}

Compares sitemaps from old and new repos to verify migration completeness.

${colors.bright}Usage:${colors.reset}
  ./scripts/sitemap-diff.ts [options]

${colors.bright}Options:${colors.reset}
  --old <path>     Path to old sitemap (default: .context/hive-console/dist/sitemap.xml)
  --new <path>     Path to new sitemap (default: packages/documentation/dist/sitemap.xml)
  --json           Output as JSON
  --save <file>    Save report to file
  --help, -h       Show this help

${colors.bright}Examples:${colors.reset}
  # Compare default sitemaps
  ./scripts/sitemap-diff.ts

  # Compare specific files and save report
  ./scripts/sitemap-diff.ts --old old.xml --new new.xml --save report.json
`);
        process.exit(0);
    }
  }

  return { oldPath, newPath, json, savePath };
}

function parseSitemap(path: string): Map<string, SitemapEntry> {
  if (!existsSync(path)) {
    throw new Error(`Sitemap not found: ${path}`);
  }

  const content = readFileSync(path, "utf-8");
  const entries = new Map<string, SitemapEntry>();

  const urlRegex = /<url>([\s\S]*?)<\/url>/g;
  let match: RegExpExecArray | null = urlRegex.exec(content);

  while (match !== null) {
    const urlBlock = match[1]!;

    const loc = extractTag(urlBlock, "loc");
    if (loc) {
      const entry: SitemapEntry = {
        loc,
        lastmod: extractTag(urlBlock, "lastmod"),
        changefreq: extractTag(urlBlock, "changefreq"),
        priority: extractTag(urlBlock, "priority"),
      };
      entries.set(entry.loc, entry);
    }

    match = urlRegex.exec(content);
  }

  return entries;
}

function extractTag(content: string, tag: string): string | undefined {
  const regex = new RegExp(`<${tag}>([^<]*)</${tag}>`);
  const match = regex.exec(content);
  return match?.[1];
}

function normalizeUrl(url: string): string {
  return url.replace(/^https?:\/\/[^\/]+/, "").replace(/\/$/, "");
}

function compareSitemaps(
  oldMap: Map<string, SitemapEntry>,
  newMap: Map<string, SitemapEntry>,
): DiffReport {
  const missingFromNew: SitemapEntry[] = [];
  const extraInNew: SitemapEntry[] = [];
  const changed: DiffReport["changed"] = [];

  const normalizedOld = new Map<string, SitemapEntry>();
  const normalizedNew = new Map<string, SitemapEntry>();

  for (const [url, entry] of oldMap) {
    normalizedOld.set(normalizeUrl(url), entry);
  }

  for (const [url, entry] of newMap) {
    normalizedNew.set(normalizeUrl(url), entry);
  }

  for (const [normalizedUrl, entry] of normalizedOld) {
    if (!normalizedNew.has(normalizedUrl)) {
      missingFromNew.push(entry);
    } else {
      const newEntry = normalizedNew.get(normalizedUrl)!;
      const differences: string[] = [];

      if (entry.lastmod !== newEntry.lastmod) {
        differences.push(`lastmod: ${entry.lastmod} → ${newEntry.lastmod}`);
      }
      if (entry.changefreq !== newEntry.changefreq) {
        differences.push(
          `changefreq: ${entry.changefreq} → ${newEntry.changefreq}`,
        );
      }
      if (entry.priority !== newEntry.priority) {
        differences.push(`priority: ${entry.priority} → ${newEntry.priority}`);
      }

      if (differences.length > 0) {
        changed.push({
          url: normalizedUrl,
          old: entry,
          new: newEntry,
          differences,
        });
      }
    }
  }

  for (const [normalizedUrl, entry] of normalizedNew) {
    if (!normalizedOld.has(normalizedUrl)) {
      extraInNew.push(entry);
    }
  }

  const matching = normalizedOld.size - missingFromNew.length - changed.length;

  return {
    summary: {
      oldTotal: normalizedOld.size,
      newTotal: normalizedNew.size,
      missingFromNew: missingFromNew.length,
      extraInNew: extraInNew.length,
      matching,
    },
    missingFromNew,
    extraInNew,
    changed,
  };
}

function printReport(report: DiffReport): void {
  console.log(
    `\n${colors.bright}${colors.cyan}╔════════════════════════════════════════════════════════╗${colors.reset}`,
  );
  console.log(
    `${colors.bright}${colors.cyan}║${colors.reset}           ${colors.bright}SITEMAP COMPARISON REPORT${colors.reset}                ${colors.cyan}║${colors.reset}`,
  );
  console.log(
    `${colors.bright}${colors.cyan}╚════════════════════════════════════════════════════════╝${colors.reset}\n`,
  );

  const { summary } = report;

  console.log(`${colors.bright}Summary:${colors.reset}`);
  console.log(
    `  Old sitemap: ${colors.yellow}${summary.oldTotal}${colors.reset} URLs`,
  );
  console.log(
    `  New sitemap: ${colors.yellow}${summary.newTotal}${colors.reset} URLs`,
  );
  console.log(`  Matching: ${colors.green}${summary.matching}${colors.reset}`);
  console.log(
    `  Missing from new: ${summary.missingFromNew > 0 ? colors.red : colors.green}${summary.missingFromNew}${colors.reset}`,
  );
  console.log(
    `  Extra in new: ${summary.extraInNew > 0 ? colors.yellow : colors.green}${summary.extraInNew}${colors.reset}`,
  );
  console.log(
    `  Changed metadata: ${report.changed.length > 0 ? colors.yellow : colors.green}${report.changed.length}${colors.reset}`,
  );

  if (report.missingFromNew.length > 0) {
    console.log(
      `\n${colors.red}${colors.bright}Missing from new sitemap:${colors.reset}`,
    );
    report.missingFromNew.slice(0, 10).forEach((entry) => {
      console.log(`  ${colors.red}✗${colors.reset} ${entry.loc}`);
    });
    if (report.missingFromNew.length > 10) {
      console.log(
        `  ${colors.dim}... and ${report.missingFromNew.length - 10} more${colors.reset}`,
      );
    }
  }

  if (report.extraInNew.length > 0) {
    console.log(
      `\n${colors.yellow}${colors.bright}Extra in new sitemap:${colors.reset}`,
    );
    report.extraInNew.slice(0, 10).forEach((entry) => {
      console.log(`  ${colors.yellow}+${colors.reset} ${entry.loc}`);
    });
    if (report.extraInNew.length > 10) {
      console.log(
        `  ${colors.dim}... and ${report.extraInNew.length - 10} more${colors.reset}`,
      );
    }
  }

  if (report.changed.length > 0) {
    console.log(
      `\n${colors.yellow}${colors.bright}Changed metadata:${colors.reset}`,
    );
    report.changed.slice(0, 5).forEach(({ url, differences }) => {
      console.log(`  ${colors.yellow}~${colors.reset} ${url}`);
      differences.forEach((diff) => {
        console.log(`    ${colors.dim}${diff}${colors.reset}`);
      });
    });
    if (report.changed.length > 5) {
      console.log(
        `  ${colors.dim}... and ${report.changed.length - 5} more${colors.reset}`,
      );
    }
  }

  if (report.missingFromNew.length === 0 && report.changed.length === 0) {
    console.log(
      `\n${colors.green}${colors.bright}✓ All content successfully migrated!${colors.reset}`,
    );
  } else {
    console.log(
      `\n${colors.yellow}${colors.bright}⚠ Migration incomplete${colors.reset}`,
    );
    console.log(
      `${colors.dim}Run with --json for detailed report${colors.reset}`,
    );
  }

  console.log();
}

async function main(): Promise<void> {
  const { oldPath, newPath, json, savePath } = parseArgs();

  try {
    const [oldMap, newMap] = await Promise.all([
      parseSitemap(resolve(oldPath)),
      parseSitemap(resolve(newPath)),
    ]);

    const report = compareSitemaps(oldMap, newMap);

    if (json) {
      console.log(JSON.stringify(report, null, 2));
    } else {
      printReport(report);
    }

    if (savePath) {
      writeFileSync(savePath, JSON.stringify(report, null, 2));
      console.log(
        `${colors.green}✓ Report saved to ${savePath}${colors.reset}\n`,
      );
    }

    process.exit(report.missingFromNew.length > 0 ? 1 : 0);
  } catch (error: any) {
    console.error(`${colors.red}Error: ${error.message}${colors.reset}`);
    console.error(
      `${colors.dim}Make sure both sitemaps exist and are valid XML${colors.reset}\n`,
    );
    process.exit(1);
  }
}

main();
