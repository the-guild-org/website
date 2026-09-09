/** Builds a Pagefind index per registry product, under its mount. */
import { execFileSync } from 'node:child_process';
import { DIST } from '../lib/build-output.ts';
import { loadProducts } from './registry.ts';

for (const product of await loadProducts()) {
  execFileSync('pagefind', ['--site', `${DIST}/graphql/${product.slug}`], { stdio: 'inherit' });
}
