/**
 * Adds every registry product's legacy redirects to dist/_redirects; the
 * hive generator runs first and owns the file. See scripts/lib/redirects-file.ts
 * for the ordering and limits this has to respect.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { productBasePath, type ProductDefinition } from '../../src/products/define.ts';
import { PROJECT_DIR, resolvesInDist } from '../lib/build-output.ts';
import {
  checkLimits,
  readRedirectLines,
  setRuleBlocks,
  writeRedirectLines,
} from '../lib/redirects-file.ts';
import { loadProducts } from './registry.ts';

/**
 * A content folder with a meta.json but no index page has a URL that serves
 * nothing (/docs/api/utils in the Tools API reference, /docs/recipes in
 * several products), and old links and search results do land on it. Such a
 * folder redirects to its first page in sidebar order, resolved through
 * nested folders until a real page is reached.
 */
function folderIndexRedirects(product: ProductDefinition): Record<string, string> {
  const redirects: Record<string, string> = {};
  const contentDir = join(PROJECT_DIR, 'src/products', product.slug, 'content');
  const hasIndex = (dir: string) => ['index.mdx', 'index.md'].some(f => existsSync(join(dir, f)));
  const firstPage = (dir: string, href: string): string | undefined => {
    if (hasIndex(dir)) return href;
    const metaFile = join(dir, 'meta.json');
    if (!existsSync(metaFile)) return undefined;
    const { pages = [] } = JSON.parse(readFileSync(metaFile, 'utf8')) as { pages?: string[] };
    for (const page of pages) {
      if (page.startsWith('[')) continue; // an external link entry
      if (['.mdx', '.md'].some(ext => existsSync(join(dir, `${page}${ext}`))))
        return `${href}/${page}`;
      if (existsSync(join(dir, page))) {
        const nested = firstPage(join(dir, page), `${href}/${page}`);
        if (nested) return nested;
      }
    }
    return undefined;
  };
  for (const section of product.sections) {
    const sectionDir = join(contentDir, section.dir);
    if (!existsSync(sectionDir)) continue;
    const folders = [
      '',
      ...readdirSync(sectionDir, { recursive: true, withFileTypes: true })
        .filter(entry => entry.isDirectory())
        .map(entry => `${entry.parentPath}/${entry.name}`.slice(sectionDir.length)),
    ];
    for (const folder of folders) {
      const dir = join(sectionDir, folder);
      if (hasIndex(dir) || !existsSync(join(dir, 'meta.json'))) continue;
      const target = firstPage(dir, `${section.base}${folder}`);
      if (target) redirects[`${section.base}${folder}`] = target;
    }
  }
  return redirects;
}

const lines = readRedirectLines();
let total = 0;

for (const product of await loadProducts()) {
  const base = productBasePath(product);
  // Hand-written legacy rules win over the generated folder ones.
  const all = { ...folderIndexRedirects(product), ...product.redirects };
  const rules = Object.entries(all)
    .map(([source, destination]) => {
      const target = destination.startsWith('/') ? `${base}${destination}` : destination;
      return `${base}${source} ${target} 301`;
    })
    // A generated folder rule must land on a built page and never hide one;
    // hand-written rules are checked by scripts/verify-redirects.ts instead,
    // so a mistake there fails the build rather than vanishing.
    .filter(rule => {
      const [source, target] = rule.split(' ');
      const generated = !(source!.slice(base.length) in product.redirects);
      return !generated || (!resolvesInDist(source!) && resolvesInDist(target!));
    });
  total += rules.length;
  setRuleBlocks(
    lines,
    `${product.name} legacy routes`,
    rules,
    'scripts/products/generate-redirects.ts',
  );
}

const { staticCount, dynamicCount } = checkLimits(lines);
writeRedirectLines(lines);
console.log(
  `Inserted ${total} product redirects; ${staticCount} static, ${dynamicCount} dynamic in total`,
);
