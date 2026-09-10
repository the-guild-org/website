/**
 * Adds every registry product's legacy redirects to dist/_redirects; the
 * hive generator runs first and owns the file. See scripts/lib/redirects-file.ts
 * for the ordering and limits this has to respect.
 */
import { productBasePath } from '../../src/products/define.ts';
import {
  checkLimits,
  readRedirectLines,
  setRuleBlocks,
  writeRedirectLines,
} from '../lib/redirects-file.ts';
import { loadProducts } from './registry.ts';

const lines = readRedirectLines();
let total = 0;

for (const product of await loadProducts()) {
  const base = productBasePath(product);
  const rules = Object.entries(product.redirects).map(([source, destination]) => {
    const target = destination.startsWith('/') ? `${base}${destination}` : destination;
    return `${base}${source} ${target} 301`;
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
