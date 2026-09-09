/**
 * Every product under src/products/<slug>/product.ts. Adding a product is
 * adding that file; the routes, collections, and build steps pick it up.
 */
import type { ProductDefinition } from './define';

const modules = import.meta.glob<{ default: ProductDefinition }>('./*/product.ts', {
  eager: true,
});

export const PRODUCTS: ProductDefinition[] = Object.values(modules)
  .map(module => module.default)
  .sort((a, b) => a.slug.localeCompare(b.slug));

export function getProduct(slug: string): ProductDefinition | undefined {
  return PRODUCTS.find(product => product.slug === slug);
}
