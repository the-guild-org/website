/**
 * Fetches the Envelop docs from the graphql-yoga repository, where Envelop
 * lives. The content is authored in that repo's envelop-website/ folder —
 * plain MDX with meta.json ordering, the older majors under v2/ and v3/,
 * the plugin registry (plugins.json), and images — and the plugins' readmes
 * come from packages/envelop. This script is the only bridge into this site.
 *
 * Set ENVELOP_REPO_DIR (or YOGA_REPO_DIR, same repo) to a local clone to skip
 * the network fetch; otherwise a shallow sparse clone of the default branch
 * is made into a temporary directory. ENVELOP_REPO_REF (or YOGA_REPO_REF)
 * overrides the ref — a branch, tag, SHA, or refs/pull/<n>/head — used by
 * the docs preview workflow to build a PR's content.
 *
 * Outputs (all gitignored):
 *   src/envelop/content/{docs,v2,v3}/**
 *   src/envelop/generated/plugins-registry.json
 *   src/envelop/generated/readmes.json   (readmes hosted in this repo; fetch-plugins.ts adds the rest)
 *   public/graphql/envelop/assets/**
 */
import { execFileSync } from 'node:child_process';
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  realpathSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { isAbsolute, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { absolutizeReadmeLinks } from './readme-links.ts';

const REPO = 'https://github.com/graphql-hive/graphql-yoga.git';
const REPO_SLUG = 'graphql-hive/graphql-yoga';
const SPARSE_PATHS = [
  'envelop-website/content',
  'envelop-website/assets',
  'envelop-website/plugins.json',
  'packages/envelop/**/README.md',
  'packages/envelop/core/docs/*.md',
];

const projectDir = fileURLToPath(new URL('../..', import.meta.url));
const contentDir = join(projectDir, 'src/envelop/content');
const generatedDir = join(projectDir, 'src/envelop/generated');
const publicDir = join(projectDir, 'public/graphql/envelop');

function fetchSource(): { dir: string; temporary: boolean } {
  const local = process.env.ENVELOP_REPO_DIR ?? process.env.YOGA_REPO_DIR;
  if (local) {
    if (!existsSync(join(local, 'envelop-website/content'))) {
      throw new Error(`ENVELOP_REPO_DIR does not look like the Yoga repo: ${local}`);
    }
    console.log(`Using local Yoga repo at ${local}`);
    return { dir: local, temporary: false };
  }
  const tmp = mkdtempSync(join(tmpdir(), 'envelop-content-'));
  const ref = process.env.ENVELOP_REPO_REF ?? process.env.YOGA_REPO_REF;
  console.log(`Sparse-cloning ${REPO}${ref ? ` at ${ref}` : ''}`);
  execFileSync('git', ['clone', '--depth=1', '--filter=blob:none', '--sparse', REPO, tmp], {
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
  // --no-cone: the sparse list mixes directories and file globs, which cone
  // mode rejects. Patterns are root-anchored.
  execFileSync(
    'git',
    ['-C', tmp, 'sparse-checkout', 'set', '--no-cone', ...SPARSE_PATHS.map(path => `/${path}`)],
    { stdio: ['ignore', 'ignore', 'inherit'] },
  );
  return { dir: tmp, temporary: true };
}

const { dir: source, temporary } = fetchSource();
const website = join(source, 'envelop-website');

rmSync(contentDir, { recursive: true, force: true });
rmSync(publicDir, { recursive: true, force: true });
mkdirSync(generatedDir, { recursive: true });

cpSync(join(website, 'content'), contentDir, { recursive: true });
mkdirSync(publicDir, { recursive: true });
cpSync(join(website, 'assets'), join(publicDir, 'assets'), { recursive: true });

const registry = JSON.parse(readFileSync(join(website, 'plugins.json'), 'utf8')) as {
  plugins: Record<string, { readme?: { path?: string; repo?: string } }>;
  tags: string[];
};
writeFileSync(
  join(generatedDir, 'plugins-registry.json'),
  `${JSON.stringify(registry, null, 2)}\n`,
);

// Readmes that live in this repo are read straight from the checkout; the
// ones in other repositories are fetched by fetch-plugins.ts.
const readmes: Record<string, string> = {};
let missing = 0;
const sourceReal = realpathSync(source);
for (const [key, plugin] of Object.entries(registry.plugins)) {
  const readme = plugin.readme;
  if (!readme?.repo || !readme.path || readme.repo !== REPO_SLUG) continue;
  // plugins.json comes from the fetched ref (a PR, for previews): never let a
  // readme path (or a symlink it points at) escape the checkout.
  let file: string | undefined;
  try {
    file = realpathSync(resolve(source, readme.path));
  } catch {
    file = undefined;
  }
  const inside = file ? relative(sourceReal, file) : '..';
  if (!file || inside.startsWith('..') || isAbsolute(inside)) {
    missing++;
    console.warn(`readme missing for ${key}: ${readme.path}`);
    continue;
  }
  readmes[key] = absolutizeReadmeLinks(readFileSync(file, 'utf8'), REPO_SLUG, readme.path);
}
writeFileSync(join(generatedDir, 'readmes.json'), `${JSON.stringify(readmes, null, 2)}\n`);

if (temporary) rmSync(source, { recursive: true, force: true });

const docsCount = execFileSync('find', [contentDir, '-name', '*.mdx'], { encoding: 'utf8' })
  .trim()
  .split('\n').length;
console.log(
  `Envelop content ready: ${docsCount} MDX files, ${Object.keys(registry.plugins).length} plugins in registry, ${Object.keys(readmes).length} readmes from the repo${missing ? ` (${missing} missing)` : ''}`,
);
