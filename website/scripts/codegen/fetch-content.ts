/**
 * Fetches the GraphQL Codegen docs content from the graphql-code-generator
 * repository and adapts it for this site's Astro pipeline. The content is
 * managed in that repo (website/src/pages); this script is the only bridge.
 *
 * Set CODEGEN_REPO_DIR to a local clone to skip the network fetch (useful
 * for development); otherwise a shallow sparse clone of the default branch
 * is made into a temporary directory.
 *
 * Nextra-isms are converted mechanically:
 *   - `_meta.ts` ordering files    → Fumadocs-style `meta.json` + injected
 *                                    `sidebarTitle` frontmatter
 *   - ```ts filename="x"           → ```ts title="x" (rehype-code syntax)
 *   - Nextra shim imports/exports  → stripped (components come from the
 *                                    render-time components map)
 *   - `<PluginHeader/>`/`<PluginApiDocs/>` markers → stripped (the plugin
 *                                    page layout renders the header itself)
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
import { dirname, join, relative } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { parse as parseYaml, stringify as stringifyYaml } from 'yaml';

const CODEGEN_REPO = 'https://github.com/dotansimha/graphql-code-generator.git';
const SPARSE_PATHS = [
  'website/src/pages',
  'website/src/components/java-installation.mdx',
  'website/src/lib/plugins/packages.ts',
  'website/src/lib/plugins-docs.ts',
  'website/src/lib/plugins/icons',
  'website/src/category-to-packages.mjs',
  'website/public/assets',
  'website/public/config.schema.json',
];

const projectDir = fileURLToPath(new URL('../..', import.meta.url));
const contentDir = join(projectDir, 'src/codegen/content');
const generatedDir = join(projectDir, 'src/codegen/generated');
const publicDir = join(projectDir, 'public/graphql/codegen');

function fetchSource(): string {
  const local = process.env.CODEGEN_REPO_DIR;
  if (local) {
    if (!existsSync(join(local, 'website/src/pages'))) {
      throw new Error(`CODEGEN_REPO_DIR does not look like the codegen repo: ${local}`);
    }
    console.log(`Using local codegen repo at ${local}`);
    return local;
  }
  const tmp = mkdtempSync(join(tmpdir(), 'codegen-content-'));
  console.log(`Sparse-cloning ${CODEGEN_REPO}`);
  execFileSync('git', ['clone', '--depth=1', '--filter=blob:none', '--sparse', CODEGEN_REPO, tmp], {
    stdio: ['ignore', 'ignore', 'inherit'],
  });
  // --no-cone: the sparse list includes individual files, which cone mode
  // rejects. Patterns are root-anchored.
  execFileSync(
    'git',
    ['-C', tmp, 'sparse-checkout', 'set', '--no-cone', ...SPARSE_PATHS.map(path => `/${path}`)],
    { stdio: ['ignore', 'ignore', 'inherit'] },
  );
  return tmp;
}

/** Import a `_meta.ts` file (a pure object literal) by copying it to .mjs. */
async function loadMeta(file: string): Promise<Record<string, unknown>> {
  const tmp = join(tmpdir(), `codegen-meta-${Math.random().toString(36).slice(2)}.mjs`);
  writeFileSync(tmp, readFileSync(file, 'utf8'));
  try {
    const mod = await import(pathToFileURL(tmp).href);
    return mod.default as Record<string, unknown>;
  } finally {
    rmSync(tmp, { force: true });
  }
}

interface Frontmatter {
  raw: Record<string, unknown>;
  body: string;
}

function parseFrontmatter(source: string): Frontmatter {
  const match = source.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) return { raw: {}, body: source };
  const raw = (parseYaml(match[1]) ?? {}) as Record<string, unknown>;
  return { raw, body: source.slice(match[0].length) };
}

function serializeFrontmatter(raw: Record<string, unknown>): string {
  // Drop null-valued keys (e.g. a "description:" with no value).
  const entries = Object.fromEntries(
    Object.entries(raw).filter(([, value]) => value !== null && value !== undefined),
  );
  if (Object.keys(entries).length === 0) return '---\n---\n';
  return `---\n${stringifyYaml(entries).trimEnd()}\n---\n`;
}

const KNOWN_IMPORT_SOURCES = [
  '@theguild/components',
  '@/components/plugin',
  '@/lib/plugin-get-static-props',
  '@components/plugin',
];

function transformMdx(
  source: string,
  options: { pluginPage: boolean; file: string },
): { output: string; staticPropsOptions: Record<string, unknown> } {
  const { raw, body } = parseFrontmatter(source);
  let text = body;
  const staticPropsOptions: Record<string, unknown> = {};

  // getStaticProps shim: record its options, then drop it.
  text = text.replace(
    /^export const getStaticProps = pluginGetStaticProps\(__filename(?:,\s*(\{[\s\S]*?\}))?\);?\s*$/m,
    (_, optionsLiteral?: string) => {
      if (optionsLiteral) {
        for (const [, key, value] of optionsLiteral.matchAll(/(\w+):\s*(true|false)/g)) {
          staticPropsOptions[key] = value === 'true';
        }
      }
      return '';
    },
  );

  // Walk line by line, tracking fence state — `import` lines and component
  // markers inside code blocks are sample code and must survive untouched.
  const lines = text.split('\n');
  const kept: string[] = [];
  let fence: string | null = null;
  let strippedH1: string | undefined;
  for (const line of lines) {
    const fenceMatch = line.match(/^(\s*)(`{3,}|~{3,})(.*)$/);
    if (fenceMatch) {
      if (fence === null) {
        fence = fenceMatch[2];
        // Nextra names code-block files `filename="x"`; rehype-code uses `title`.
        kept.push(line.replace(/\bfilename=/, 'title='));
      } else if (fenceMatch[2].startsWith(fence) && fenceMatch[3].trim() === '') {
        fence = null;
        kept.push(line);
      } else {
        kept.push(line);
      }
      continue;
    }
    if (fence !== null) {
      kept.push(line);
      continue;
    }

    // Type-only imports are erased at compile time — nothing to resolve.
    if (/^import\s+type\s/.test(line)) continue;

    const importMatch = line.match(/^import\s[^\n]*from\s+['"]([^'"]+)['"];?\s*$/);
    if (importMatch) {
      const source_ = importMatch[1];
      if (
        KNOWN_IMPORT_SOURCES.some(known => source_ === known || source_.startsWith(`${known}/`))
      ) {
        continue;
      }
      if (source_.endsWith('java-installation.mdx')) {
        const importer = join(contentDir, options.pluginPage ? 'plugins' : 'docs', options.file);
        const target = join(contentDir, 'partials/java-installation.mdx');
        let rel = relative(dirname(importer), target);
        if (!rel.startsWith('.')) rel = `./${rel}`;
        kept.push(line.replace(/['"][^'"]+['"]/, `'${rel}'`));
        continue;
      }
      throw new Error(`Unknown import in ${options.file}: ${line.trim()}`);
    }

    // Plugin page markers — the plugin layout renders the header itself.
    if (/^<Plugin(Header|ApiDocs)\s*\/>\s*$/.test(line)) continue;

    // The docs layout renders the page title as the <h1>; Nextra content
    // carries its own. Strip the first h1 and promote it to the title.
    if (strippedH1 === undefined) {
      const h1 = line.match(/^# (.+)$/);
      if (h1) {
        strippedH1 = h1[1].trim();
        continue;
      }
    }

    kept.push(line);
  }
  text = kept.join('\n');

  if (strippedH1 && typeof raw.title !== 'string') {
    raw.title = strippedH1.replaceAll('`', '');
  }

  text = text.replace(/\n{3,}/g, '\n\n').replace(/^\n+/, '');
  return { output: serializeFrontmatter(raw) + text, staticPropsOptions };
}

async function convertMetaTree(sourceDir: string, targetDir: string) {
  const metaFile = join(sourceDir, '_meta.ts');
  if (!existsSync(metaFile)) return;
  const meta = await loadMeta(metaFile);
  const pages: string[] = [];
  for (const [key, value] of Object.entries(meta)) {
    if (key === '*') continue;
    pages.push(key);
    if (typeof value !== 'string') continue;
    const childDir = join(sourceDir, key);
    if (existsSync(childDir) && readdirSync(childDir).length > 0) {
      // Folder label → the folder's own meta.json title.
      const childMetaPath = join(targetDir, key, 'meta.json');
      const childMeta = existsSync(childMetaPath)
        ? JSON.parse(readFileSync(childMetaPath, 'utf8'))
        : {};
      childMeta.title = value;
      mkdirSync(dirname(childMetaPath), { recursive: true });
      writeFileSync(childMetaPath, `${JSON.stringify(childMeta, null, 2)}\n`);
    } else {
      // Page label → sidebarTitle frontmatter on the transformed page.
      for (const candidate of [`${key}.mdx`, `${key}.md`]) {
        const page = join(targetDir, candidate);
        if (!existsSync(page)) continue;
        const { raw, body } = parseFrontmatter(readFileSync(page, 'utf8'));
        if (raw.sidebarTitle === undefined && raw.title !== value) {
          raw.sidebarTitle = value;
          writeFileSync(page, serializeFrontmatter(raw) + body);
        }
      }
    }
  }
  const metaJsonPath = join(targetDir, 'meta.json');
  const existing = existsSync(metaJsonPath) ? JSON.parse(readFileSync(metaJsonPath, 'utf8')) : {};
  writeFileSync(metaJsonPath, `${JSON.stringify({ ...existing, pages }, null, 2)}\n`);
}

async function convertContentTree(sourceDir: string, targetDir: string, pluginPage: boolean) {
  mkdirSync(targetDir, { recursive: true });
  for (const entry of readdirSync(sourceDir, { withFileTypes: true })) {
    const sourcePath = join(sourceDir, entry.name);
    if (entry.isDirectory()) {
      await convertContentTree(sourcePath, join(targetDir, entry.name), pluginPage);
      continue;
    }
    if (!/\.mdx?$/.test(entry.name)) continue;
    const file = relative(sourceDir, sourcePath);
    const { output, staticPropsOptions } = transformMdx(readFileSync(sourcePath, 'utf8'), {
      pluginPage,
      file: join(relative(join(sourceDir, '..'), sourceDir), file),
    });
    let final = output;
    if (pluginPage && Object.keys(staticPropsOptions).length > 0) {
      const { raw, body } = parseFrontmatter(output);
      for (const [key, value] of Object.entries(staticPropsOptions)) raw[key] = value;
      final = serializeFrontmatter(raw) + body;
    }
    writeFileSync(join(targetDir, entry.name), final);
  }
  await convertMetaTree(sourceDir, targetDir);
}

/** Extract the PACKAGES literal without executing its Next.js-only imports. */
function extractPackagesRegistry(source: string): Record<string, unknown> {
  const match = source.match(/export const PACKAGES[^=]*=\s*(\{[\s\S]*?\n\})/);
  if (!match) throw new Error('Could not locate PACKAGES in packages.ts');
  // The literal is plain data (strings/arrays); evaluate it in isolation.
  return new Function(`return (${match[1]})`)() as Record<string, unknown>;
}

function extractConfigDocsMap(source: string): { name: string; identifier: string }[] {
  const entries: { name: string; identifier: string }[] = [];
  for (const [, identifier, name] of source.matchAll(
    /identifier:\s*'([^']+)'[\s\S]{0,120}?name:\s*'([^']+)'|name:\s*'([^']+)'[\s\S]{0,120}?identifier:\s*'([^']+)'/g,
  )) {
    if (identifier && name) entries.push({ identifier, name });
  }
  // The file interleaves `{ file, identifier, name }` objects; a second pass
  // with a stricter object-scoped regex keeps ordering-independent pairs.
  if (entries.length === 0) {
    for (const [block] of source.matchAll(/\{[^{}]*identifier:[^{}]*\}/g)) {
      const identifier = block.match(/identifier:\s*'([^']+)'/)?.[1];
      const name = block.match(/name:\s*'([^']+)'/)?.[1];
      if (identifier && name) entries.push({ identifier, name });
    }
  }
  return entries;
}

const source = fetchSource();
const website = join(source, 'website');

rmSync(contentDir, { recursive: true, force: true });
rmSync(generatedDir, { recursive: true, force: true });
rmSync(publicDir, { recursive: true, force: true });
mkdirSync(generatedDir, { recursive: true });

await convertContentTree(join(website, 'src/pages/docs'), join(contentDir, 'docs'), false);
await convertContentTree(join(website, 'src/pages/plugins'), join(contentDir, 'plugins'), true);

mkdirSync(join(contentDir, 'partials'), { recursive: true });
const partial = transformMdx(
  readFileSync(join(website, 'src/components/java-installation.mdx'), 'utf8'),
  {
    pluginPage: false,
    file: 'partials/java-installation.mdx',
  },
);
// An imported MDX partial does not inherit the parent's components map, so
// it must import what it renders itself.
writeFileSync(
  join(contentDir, 'partials/java-installation.mdx'),
  partial.output.replace(
    /^---\n([\s\S]*?)---\n/,
    `---\n$1---\n\nimport Callout from '~hive/components/mdx/Callout.astro';\n\n`,
  ),
);

const registry = extractPackagesRegistry(
  readFileSync(join(website, 'src/lib/plugins/packages.ts'), 'utf8'),
);
// Category = the directory the plugin page actually lives in (the
// category-to-packages module upstream has drifted from the file layout).
const packageToCategory: Record<string, string> = {};
for (const category of readdirSync(join(website, 'src/pages/plugins'), { withFileTypes: true })) {
  if (!category.isDirectory()) continue;
  for (const file of readdirSync(join(website, 'src/pages/plugins', category.name))) {
    if (/\.mdx?$/.test(file)) packageToCategory[file.replace(/\.mdx?$/, '')] = category.name;
  }
}
const iconFiles = new Set(readdirSync(join(website, 'src/lib/plugins/icons')));
for (const [key, value] of Object.entries(registry)) {
  const record = value as Record<string, unknown>;
  record.category = packageToCategory[key] ?? 'other';
  // Icon identifiers use underscores; files are kebab-case svg or png.
  const icon = String(record.icon);
  if (!/^https?:\/\//.test(icon)) {
    const kebab = icon.replaceAll('_', '-');
    const file = [`${kebab}.svg`, `${kebab}.png`, `${icon}.svg`, `${icon}.png`].find(candidate =>
      iconFiles.has(candidate),
    );
    record.iconFile = file ?? 'codegen.svg';
  }
}
writeFileSync(
  join(generatedDir, 'plugins-registry.json'),
  `${JSON.stringify(registry, null, 2)}\n`,
);
writeFileSync(
  join(generatedDir, 'config-docs-map.json'),
  `${JSON.stringify(extractConfigDocsMap(readFileSync(join(website, 'src/lib/plugins-docs.ts'), 'utf8')), null, 2)}\n`,
);

mkdirSync(publicDir, { recursive: true });
cpSync(join(website, 'public/assets'), join(publicDir, 'assets'), { recursive: true });
cpSync(join(website, 'public/config.schema.json'), join(publicDir, 'config.schema.json'));
cpSync(join(website, 'src/lib/plugins/icons'), join(publicDir, 'icons'), { recursive: true });

if (!process.env.CODEGEN_REPO_DIR) rmSync(source, { recursive: true, force: true });

const docsCount = execFileSync('find', [contentDir, '-name', '*.mdx'], { encoding: 'utf8' })
  .trim()
  .split('\n').length;
console.log(
  `Codegen content ready: ${docsCount} MDX files, ${Object.keys(registry).length} plugins in registry`,
);
