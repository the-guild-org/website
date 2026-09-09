/**
 * Fetches the GraphQL Inspector docs from the graphql-inspector repository.
 * The content is authored in that repo's website/ folder — plain MDX with
 * meta.json ordering, and images — and this script is the only bridge into
 * this site.
 *
 * Set INSPECTOR_REPO_DIR to a local clone to skip the network fetch;
 * otherwise a shallow sparse clone of the default branch is made into a
 * temporary directory. INSPECTOR_REPO_REF overrides the ref to fetch — a
 * branch, tag, SHA, or refs/pull/<n>/head — used by the docs preview
 * workflow to build a PR's content.
 *
 * Outputs (all gitignored):
 *   src/inspector/content/docs/**
 *   public/graphql/inspector/assets/**
 */
import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = 'https://github.com/graphql-hive/graphql-inspector.git';
const SPARSE_PATHS = ['website/content', 'website/assets'];

const projectDir = fileURLToPath(new URL('../..', import.meta.url));
const contentDir = join(projectDir, 'src/inspector/content');
const publicDir = join(projectDir, 'public/graphql/inspector');

function fetchSource(): { dir: string; temporary: boolean } {
  const local = process.env.INSPECTOR_REPO_DIR;
  if (local) {
    for (const required of SPARSE_PATHS) {
      if (!existsSync(join(local, required))) {
        throw new Error(
          `INSPECTOR_REPO_DIR does not look like the Inspector repo (missing ${required}): ${local}`,
        );
      }
    }
    console.log(`Using local Inspector repo at ${local}`);
    return { dir: local, temporary: false };
  }
  const tmp = mkdtempSync(join(tmpdir(), 'inspector-content-'));
  try {
    const ref = process.env.INSPECTOR_REPO_REF;
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
    execFileSync('git', ['-C', tmp, 'sparse-checkout', 'set', ...SPARSE_PATHS], {
      stdio: ['ignore', 'ignore', 'inherit'],
    });
  } catch (error) {
    // A half-made clone is of no use to a retry; do not leave it in the temp dir.
    rmSync(tmp, { recursive: true, force: true });
    throw error;
  }
  return { dir: tmp, temporary: true };
}

const { dir: source, temporary } = fetchSource();
const website = join(source, 'website');

rmSync(contentDir, { recursive: true, force: true });
rmSync(publicDir, { recursive: true, force: true });
cpSync(join(website, 'content'), contentDir, { recursive: true });
mkdirSync(publicDir, { recursive: true });
cpSync(join(website, 'assets'), join(publicDir, 'assets'), { recursive: true });

if (temporary) rmSync(source, { recursive: true, force: true });

const docsCount = execFileSync('find', [contentDir, '-name', '*.mdx'], { encoding: 'utf8' })
  .trim()
  .split('\n').length;
console.log(`Inspector content ready: ${docsCount} MDX files`);
