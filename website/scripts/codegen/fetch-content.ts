/**
 * Fetches the GraphQL Codegen docs from the graphql-code-generator repository.
 * The content is authored in that repo's website/ folder — plain MDX with
 * meta.json ordering, a plugin registry, icons, images, and the generated
 * config.schema.json — and this script is the only bridge into this site.
 *
 * Set CODEGEN_REPO_DIR to a local clone to skip the network fetch (useful
 * for development); otherwise a shallow sparse clone of the default branch
 * is made into a temporary directory. CODEGEN_REPO_REF overrides the ref to
 * fetch — a branch, tag, SHA, or refs/pull/<n>/head — used by the docs
 * preview workflow to build a codegen PR's content.
 *
 * Outputs (all gitignored):
 *   src/codegen/content/{docs,plugins,partials}/**
 *   src/codegen/generated/plugins-registry.json
 *   src/codegen/generated/config-docs-map.json
 *   public/graphql/codegen/{assets,icons}/** and config.schema.json
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

const CODEGEN_REPO = 'https://github.com/dotansimha/graphql-code-generator.git';
const SPARSE_PATHS = [
  'website/content',
  'website/assets',
  'website/icons',
  'website/plugins.json',
  'website/plugin-configs.json',
  'website/config.schema.json',
];

const projectDir = fileURLToPath(new URL('../..', import.meta.url));
const contentDir = join(projectDir, 'src/codegen/content');
const generatedDir = join(projectDir, 'src/codegen/generated');
const publicDir = join(projectDir, 'public/graphql/codegen');

function fetchSource(): string {
  const local = process.env.CODEGEN_REPO_DIR;
  if (local) {
    if (!existsSync(join(local, 'website/content'))) {
      throw new Error(`CODEGEN_REPO_DIR does not look like the codegen repo: ${local}`);
    }
    console.log(`Using local codegen repo at ${local}`);
    return local;
  }
  const tmp = mkdtempSync(join(tmpdir(), 'codegen-content-'));
  const ref = process.env.CODEGEN_REPO_REF;
  console.log(`Sparse-cloning ${CODEGEN_REPO}${ref ? ` at ${ref}` : ''}`);
  execFileSync('git', ['clone', '--depth=1', '--filter=blob:none', '--sparse', CODEGEN_REPO, tmp], {
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
  // --no-cone: the sparse list includes individual files, which cone mode
  // rejects. Patterns are root-anchored.
  execFileSync(
    'git',
    ['-C', tmp, 'sparse-checkout', 'set', '--no-cone', ...SPARSE_PATHS.map(path => `/${path}`)],
    { stdio: ['ignore', 'ignore', 'inherit'] },
  );
  return tmp;
}

interface PluginEntry {
  icon: string;
  npmPackage: string;
  tags: string[];
  title: string;
}

const source = fetchSource();
const website = join(source, 'website');

rmSync(contentDir, { recursive: true, force: true });
rmSync(generatedDir, { recursive: true, force: true });
rmSync(publicDir, { recursive: true, force: true });
mkdirSync(generatedDir, { recursive: true });

cpSync(join(website, 'content'), contentDir, { recursive: true });

// An imported MDX partial does not inherit the parent's components map, so
// it must import what it renders itself.
const partialPath = join(contentDir, 'partials/java-installation.mdx');
writeFileSync(
  partialPath,
  readFileSync(partialPath, 'utf8').replace(
    /^---\n([\s\S]*?)---\n+/,
    `---\n$1---\n\nimport Callout from '~hive/components/mdx/Callout.astro';\n\n`,
  ),
);

// Registry: plugins.json plus what only the file layout knows — the category
// (the page's folder) and the local icon file for the icon name.
const registry = JSON.parse(readFileSync(join(website, 'plugins.json'), 'utf8')) as Record<
  string,
  PluginEntry
>;
const packageToCategory: Record<string, string> = {};
for (const category of readdirSync(join(website, 'content/plugins'), { withFileTypes: true })) {
  if (!category.isDirectory()) continue;
  for (const file of readdirSync(join(website, 'content/plugins', category.name))) {
    if (/\.mdx?$/.test(file)) packageToCategory[file.replace(/\.mdx?$/, '')] = category.name;
  }
}
const iconFiles = new Set(readdirSync(join(website, 'icons')));
const output: Record<string, PluginEntry & { category: string; iconFile?: string }> = {};
for (const [key, entry] of Object.entries(registry)) {
  const record: PluginEntry & { category: string; iconFile?: string } = {
    ...entry,
    category: packageToCategory[key] ?? 'other',
  };
  // Icon identifiers use underscores; files are kebab-case svg or png.
  if (!/^https?:\/\//.test(entry.icon)) {
    const kebab = entry.icon.replaceAll('_', '-');
    record.iconFile =
      [`${kebab}.svg`, `${kebab}.png`, `${entry.icon}.svg`, `${entry.icon}.png`].find(candidate =>
        iconFiles.has(candidate),
      ) ?? 'codegen.svg';
  }
  output[key] = record;
}
writeFileSync(join(generatedDir, 'plugins-registry.json'), `${JSON.stringify(output, null, 2)}\n`);

// Plugin name → config type identifier, for the Config API Reference.
const configs = JSON.parse(readFileSync(join(website, 'plugin-configs.json'), 'utf8')) as {
  plugins: { identifier: string; name: string }[];
  presets: { identifier: string; name: string }[];
};
writeFileSync(
  join(generatedDir, 'config-docs-map.json'),
  `${JSON.stringify(
    [...configs.presets, ...configs.plugins].map(({ identifier, name }) => ({ identifier, name })),
    null,
    2,
  )}\n`,
);

mkdirSync(publicDir, { recursive: true });
cpSync(join(website, 'assets'), join(publicDir, 'assets'), { recursive: true });
cpSync(join(website, 'icons'), join(publicDir, 'icons'), { recursive: true });
cpSync(join(website, 'config.schema.json'), join(publicDir, 'config.schema.json'));

if (!process.env.CODEGEN_REPO_DIR) rmSync(source, { recursive: true, force: true });

const docsCount = execFileSync('find', [contentDir, '-name', '*.mdx'], { encoding: 'utf8' })
  .trim()
  .split('\n').length;
console.log(
  `Codegen content ready: ${docsCount} MDX files, ${Object.keys(output).length} plugins in registry`,
);
