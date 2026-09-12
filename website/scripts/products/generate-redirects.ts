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

/**
 * The API references of graphql-ws and graphql-tools were once rendered by
 * typedoc-plugin-markdown v3, whose flat file names are still linked from
 * old issues, READMEs and search results (the-guild-org/website#1848,
 * #1862, #1865, #1868, #1892 and friends):
 *   /docs/interfaces/server.ServerOptions        -> /docs/server/interfaces/ServerOptions
 *   /docs/api/modules/wrap_src                   -> /docs/api/wrap/src
 *   /docs/api/interfaces/batch_delegate_src.X    -> /docs/api/batch-delegate/src/interfaces/X
 * Derived from the fetched content: a page `<root>/<module…>/<kind>/<Name>`
 * gets its old flat name, with the module path joined by `_` (and `-` in
 * package names turned into `_`), for the kinds v3 gave their own pages.
 */
function legacyTypedocRedirects(product: ProductDefinition): Record<string, string> {
  const redirects: Record<string, string> = {};
  const KINDS: Record<string, string> = {
    classes: 'classes',
    enumerations: 'enums',
    interfaces: 'interfaces',
  };
  const contentDir = join(PROJECT_DIR, 'src/products', product.slug, 'content');
  for (const section of product.sections) {
    const sectionDir = join(contentDir, section.dir);
    if (!existsSync(sectionDir)) continue;
    for (const file of readdirSync(sectionDir, { recursive: true, withFileTypes: true })) {
      if (!file.isFile() || !/\.mdx?$/.test(file.name)) continue;
      const relative = `${file.parentPath}/${file.name}`
        .slice(sectionDir.length + 1)
        .replace(/\.mdx?$/, '');
      const parts = relative.split('/');
      // The v4 layout puts the API root under <root>/ (Tools: `api/`); module
      // pages are `…/src/index`, symbol pages `…/<kind>/<Name>`.
      const srcAt = parts.indexOf('src');
      const kindAt = parts.findIndex(part => part in KINDS);
      if (srcAt !== -1 && parts[parts.length - 1] === 'index' && srcAt === parts.length - 2) {
        const root = parts.slice(0, parts.findIndex(part => !['api'].includes(part)) === 0 ? 0 : 1);
        const moduleId = `${parts.slice(root.length, srcAt).join('_').replace(/-/g, '_')}_src`;
        redirects[`${section.base}/${[...root, 'modules', moduleId].join('/')}`] =
          `${section.base}/${relative.replace(/\/index$/, '')}`;
      } else if (kindAt > 0 && kindAt === parts.length - 2) {
        const root = parts[0] === 'api' ? ['api'] : [];
        const modulePath = parts.slice(root.length, kindAt);
        const moduleId =
          srcAt !== -1
            ? `${modulePath.slice(0, -1).join('_').replace(/-/g, '_')}_src`
            : modulePath.join('_');
        const name = parts[parts.length - 1]!;
        redirects[
          `${section.base}/${[...root, KINDS[parts[kindAt]!]!, `${moduleId}.${name}`].join('/')}`
        ] = `${section.base}/${relative}`;
      }
    }
  }
  return redirects;
}

const lines = readRedirectLines();
let total = 0;

for (const product of await loadProducts()) {
  const base = productBasePath(product);
  // Hand-written legacy rules win over the generated folder ones.
  const all = {
    ...legacyTypedocRedirects(product),
    ...folderIndexRedirects(product),
    ...product.redirects,
  };
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
