/**
 * The product registry for the plain `node` scripts: every
 * src/products/<slug>/product.ts, loaded without Vite.
 */
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import type { ProductDefinition } from '../../src/products/define.ts';

const productsDir = fileURLToPath(new URL('../../src/products', import.meta.url));

export async function loadProducts(): Promise<ProductDefinition[]> {
  const products: ProductDefinition[] = [];
  for (const entry of readdirSync(productsDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const file = join(productsDir, entry.name, 'product.ts');
    if (!existsSync(file)) continue;
    const module = (await import(pathToFileURL(file).href)) as { default: ProductDefinition };
    products.push(module.default);
  }
  return products.sort((a, b) => a.slug.localeCompare(b.slug));
}

/** `PRODUCTS=a,b` limits a script to some products (local development). */
export async function selectedProducts(): Promise<ProductDefinition[]> {
  const products = await loadProducts();
  const only = process.env.PRODUCTS?.split(',')
    .map(slug => slug.trim())
    .filter(Boolean);
  return only?.length ? products.filter(product => only.includes(product.slug)) : products;
}
