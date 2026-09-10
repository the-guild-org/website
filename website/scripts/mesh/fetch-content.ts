/**
 * Fetches the GraphQL Mesh docs from the graphql-mesh repository. The content
 * is authored in that repo's website/ folder — plain MDX with meta.json
 * ordering for the v1 docs and the frozen v0 docs, the generated
 * config-reference Markdown those pages import, images, and the Hive
 * Gateway install script served from this mount. This script is the only
 * bridge into this site.
 *
 * Set MESH_REPO_DIR to a local clone to skip the network fetch (useful for
 * development); otherwise a shallow sparse clone of the default branch is
 * made into a temporary directory. MESH_REPO_REF overrides the ref to fetch
 * — a branch, tag, SHA, or refs/pull/<n>/head — used by the docs preview
 * workflow to build a Mesh PR's content.
 *
 * Outputs (all gitignored):
 *   src/mesh/content/{v1,docs}/**
 *   src/mesh/generated/*.generated.md
 *   public/graphql/mesh/assets/** and install-hive-gateway.sh
 */
import { execFileSync } from 'node:child_process';
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const MESH_REPO = 'https://github.com/ardatan/graphql-mesh.git';
const SPARSE_PATHS = [
  'website/content',
  'website/generated',
  'website/assets',
  'website/install-hive-gateway.sh',
];

const projectDir = fileURLToPath(new URL('../..', import.meta.url));
const contentDir = join(projectDir, 'src/mesh/content');
const generatedDir = join(projectDir, 'src/mesh/generated');
const publicDir = join(projectDir, 'public/graphql/mesh');

function fetchSource(): string {
  const local = process.env.MESH_REPO_DIR;
  if (local) {
    if (!existsSync(join(local, 'website/content'))) {
      throw new Error(`MESH_REPO_DIR does not look like the Mesh repo: ${local}`);
    }
    console.log(`Using local Mesh repo at ${local}`);
    return local;
  }
  const tmp = mkdtempSync(join(tmpdir(), 'mesh-content-'));
  // TEMPORARY: default to the Mesh content PR branch until ardatan/graphql-mesh#9655 merges.
  const ref = process.env.MESH_REPO_REF ?? 'website-content-only';
  console.log(`Sparse-cloning ${MESH_REPO}${ref ? ` at ${ref}` : ''}`);
  execFileSync('git', ['clone', '--depth=1', '--filter=blob:none', '--sparse', MESH_REPO, tmp], {
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
  // --no-cone: the sparse list includes a single file, which cone mode rejects.
  execFileSync(
    'git',
    ['-C', tmp, 'sparse-checkout', 'set', '--no-cone', ...SPARSE_PATHS.map(path => `/${path}`)],
    {
      stdio: ['ignore', 'ignore', 'inherit'],
    },
  );
  return tmp;
}

const source = fetchSource();
const website = join(source, 'website');

rmSync(contentDir, { recursive: true, force: true });
rmSync(generatedDir, { recursive: true, force: true });
rmSync(publicDir, { recursive: true, force: true });

cpSync(join(website, 'content'), contentDir, { recursive: true });
cpSync(join(website, 'generated'), generatedDir, { recursive: true });

// The pages import the generated config-reference Markdown as a component
// (`import API from '…/X.generated.md'`). Astro exposes a Markdown module's
// rendered body as its `Content` export, so rewrite the default import.
let rewritten = 0;
function rewriteGeneratedImports(dir: string) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      rewriteGeneratedImports(path);
      continue;
    }
    if (!/\.mdx$/.test(entry.name)) continue;
    const before = readFileSync(path, 'utf8');
    const after = before.replace(
      /^import (\w+) from '([^']*\/generated\/[^']+\.generated\.md)'$/gm,
      (_, name: string, from: string) => `import { Content as ${name} } from '${from}'`,
    );
    if (after !== before) {
      writeFileSync(path, after);
      rewritten++;
    }
  }
}
rewriteGeneratedImports(contentDir);

mkdirSync(publicDir, { recursive: true });
cpSync(join(website, 'assets'), join(publicDir, 'assets'), { recursive: true });
cpSync(join(website, 'install-hive-gateway.sh'), join(publicDir, 'install-hive-gateway.sh'));

if (!process.env.MESH_REPO_DIR) rmSync(source, { recursive: true, force: true });

const docsCount = execFileSync('find', [contentDir, '-name', '*.mdx'], { encoding: 'utf8' })
  .trim()
  .split('\n').length;
console.log(
  `Mesh content ready: ${docsCount} MDX files, ${rewritten} pages import generated config docs`,
);
