/**
 * Fetches the docs content of every registry product from its repository.
 * Each product authors its docs in its repo's website/ folder — plain MDX
 * with meta.json ordering, and images — and this script is the only bridge
 * into this site.
 *
 * Per product, <SLUG>_REPO_DIR (e.g. APOLLO_ANGULAR_REPO_DIR) points at a
 * local clone to skip the network fetch, and <SLUG>_REPO_REF overrides the
 * ref — a branch, tag, SHA, or refs/pull/<n>/head. The docs preview
 * workflow sets DOCS_PREVIEW_PRODUCT and DOCS_PREVIEW_REF instead.
 *
 * Outputs (all gitignored):
 *   src/products/<slug>/content/**
 *   public/graphql/<slug>/assets/**
 */
import { execFileSync } from 'node:child_process';
import {
  cpSync,
  existsSync,
  globSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { productEnvPrefix, type ProductDefinition } from '../../src/products/define.ts';
import { selectedProducts } from './registry.ts';

const projectDir = fileURLToPath(new URL('../..', import.meta.url));
const SPARSE_PATHS = ['website/content', 'website/assets'];
const sparsePaths = (product: ProductDefinition) =>
  product.changelog ? [...SPARSE_PATHS, product.changelog] : SPARSE_PATHS;

function refFor(product: ProductDefinition): string | undefined {
  if (process.env.DOCS_PREVIEW_PRODUCT === product.slug && process.env.DOCS_PREVIEW_REF) {
    return process.env.DOCS_PREVIEW_REF;
  }
  return process.env[`${productEnvPrefix(product)}_REPO_REF`] ?? product.contentRef;
}

function fetchSource(product: ProductDefinition): { dir: string; temporary: boolean } {
  const local = process.env[`${productEnvPrefix(product)}_REPO_DIR`];
  if (local) {
    for (const required of SPARSE_PATHS) {
      if (!existsSync(join(local, required))) {
        throw new Error(
          `${productEnvPrefix(product)}_REPO_DIR does not look like the ${product.name} repo (missing ${required}): ${local}`,
        );
      }
    }
    console.log(`[${product.slug}] using local repo at ${local}`);
    return { dir: local, temporary: false };
  }
  const repo = `https://github.com/${product.repo}.git`;
  const ref = refFor(product);
  const tmp = mkdtempSync(join(tmpdir(), `${product.slug}-content-`));
  console.log(`[${product.slug}] sparse-cloning ${repo}${ref ? ` at ${ref}` : ''}`);
  try {
    execFileSync('git', ['clone', '--depth=1', '--filter=blob:none', '--sparse', repo, tmp], {
      stdio: ['ignore', 'ignore', 'inherit'],
    });
    if (ref) {
      execFileSync('git', ['-C', tmp, 'fetch', '--depth=1', 'origin', ref], {
        stdio: ['ignore', 'ignore', 'inherit'],
      });
      execFileSync('git', ['-C', tmp, 'checkout', '--detach', 'FETCH_HEAD'], {
        stdio: ['ignore', 'ignore', 'inherit'],
      });
    }
    // --no-cone: the sparse list may name a single file (the changelog), which
    // cone mode rejects. Patterns are root-anchored.
    execFileSync(
      'git',
      [
        '-C',
        tmp,
        'sparse-checkout',
        'set',
        '--no-cone',
        ...sparsePaths(product).map(path => `/${path}`),
      ],
      { stdio: ['ignore', 'ignore', 'inherit'] },
    );
  } catch (error) {
    // A half-made clone is of no use to a retry; do not leave it in the temp dir.
    rmSync(tmp, { recursive: true, force: true });
    throw error;
  }
  return { dir: tmp, temporary: true };
}

for (const product of await selectedProducts()) {
  const contentDir = join(projectDir, 'src/products', product.slug, 'content');
  const publicDir = join(projectDir, 'public/graphql', product.slug);
  const { dir: source, temporary } = fetchSource(product);
  const website = join(source, 'website');

  rmSync(contentDir, { recursive: true, force: true });
  rmSync(publicDir, { recursive: true, force: true });
  cpSync(join(website, 'content'), contentDir, { recursive: true });
  mkdirSync(publicDir, { recursive: true });
  cpSync(join(website, 'assets'), join(publicDir, 'assets'), { recursive: true });
  if (product.changelog) {
    // The package changelog as a page: its own h1 goes, the title comes from frontmatter.
    const body = readFileSync(join(source, product.changelog), 'utf8')
      .replace(/^# .+\n+/, '')
      .trim();
    mkdirSync(join(contentDir, 'changelog'), { recursive: true });
    writeFileSync(
      join(contentDir, 'changelog', 'index.md'),
      `---\ntitle: Changelog\ndescription: ${JSON.stringify(`Every ${product.name} release with its changes and the pull requests behind them.`)}\n---\n\n${body || 'No published releases yet.'}\n`,
    );
  }

  if (temporary) rmSync(source, { recursive: true, force: true });
  const docsCount = globSync('**/*.{md,mdx}', { cwd: contentDir }).length;
  console.log(`[${product.slug}] content ready: ${docsCount} pages`);
}
