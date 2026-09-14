/**
 * Fetches the GraphQL Yoga docs from the graphql-yoga repository. The
 * content is authored in that repo's website/ folder — plain MDX with
 * meta.json ordering, the older majors under v2/, v3/ and v4/, shared
 * partials, and images — and every package's CHANGELOG.md becomes a
 * changelog page. This script is the only bridge into this site.
 *
 * Set YOGA_REPO_DIR to a local clone to skip the network fetch (useful for
 * development); otherwise a shallow sparse clone of the default branch is
 * made into a temporary directory. YOGA_REPO_REF overrides the ref to
 * fetch — a branch, tag, SHA, or refs/pull/<n>/head — used by the docs
 * preview workflow to build a Yoga PR's content.
 *
 * Outputs (all gitignored):
 *   src/yoga/content/{docs,tutorial,v2,v3,v4,partials,changelogs}/**
 *   public/graphql/yoga-server/assets/**
 */
import { execFileSync } from 'node:child_process';
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { collectChangelogs } from '../lib/changelogs.ts';

const YOGA_REPO = 'https://github.com/graphql-hive/graphql-yoga.git';
const SPARSE_PATHS = [
  'website/content',
  'website/assets',
  'packages/**/CHANGELOG.md',
  'packages/**/package.json',
];

const projectDir = fileURLToPath(new URL('../..', import.meta.url));
const contentDir = join(projectDir, 'src/yoga/content');
const publicDir = join(projectDir, 'public/graphql/yoga-server');

function fetchSource(): string {
  const local = process.env.YOGA_REPO_DIR;
  if (local) {
    if (!existsSync(join(local, 'website/content'))) {
      throw new Error(`YOGA_REPO_DIR does not look like the Yoga repo: ${local}`);
    }
    console.log(`Using local Yoga repo at ${local}`);
    return local;
  }
  const tmp = mkdtempSync(join(tmpdir(), 'yoga-content-'));
  const ref = process.env.YOGA_REPO_REF;
  console.log(`Sparse-cloning ${YOGA_REPO}${ref ? ` at ${ref}` : ''}`);
  execFileSync('git', ['clone', '--depth=1', '--filter=blob:none', '--sparse', YOGA_REPO, tmp], {
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
  return tmp;
}

const source = fetchSource();
const website = join(source, 'website');

rmSync(contentDir, { recursive: true, force: true });
rmSync(publicDir, { recursive: true, force: true });

cpSync(join(website, 'content'), contentDir, { recursive: true });

// An imported MDX partial does not inherit the parent's components map, so
// it must import what it renders itself.
const calloutPartial = join(contentDir, 'partials/codegen-callout.mdx');
writeFileSync(
  calloutPartial,
  readFileSync(calloutPartial, 'utf8').replace(
    /^---\n([\s\S]*?)---\n+/,
    `---\n$1---\n\nimport Callout from '~hive/components/mdx/Callout.astro';\n\n`,
  ),
);

// Changelogs: every published package's CHANGELOG.md, one page per package,
// at the package's path under packages/ (so /changelogs/plugins/jwt).
const changelogs = collectChangelogs(join(source, 'packages'), join(contentDir, 'changelogs'));

mkdirSync(publicDir, { recursive: true });
cpSync(join(website, 'assets'), join(publicDir, 'assets'), { recursive: true });

if (!process.env.YOGA_REPO_DIR) rmSync(source, { recursive: true, force: true });

const docsCount = execFileSync('find', [contentDir, '-name', '*.mdx'], { encoding: 'utf8' })
  .trim()
  .split('\n').length;
console.log(`Yoga content ready: ${docsCount} MDX files, ${changelogs} changelogs`);
