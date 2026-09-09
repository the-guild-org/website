/**
 * Data access for the Plugin Hub: the registry (envelop-website/plugins.json
 * upstream), the readmes collected from the source repositories, and the npm
 * metadata — all produced by scripts/envelop/{fetch-content,fetch-plugins}.ts
 * into src/envelop/generated (gitignored).
 */
import npmInfo from '../generated/npm-info.json';
import registry from '../generated/plugins-registry.json';
import readmes from '../generated/readmes.json';

export interface PluginRecord {
  /** Icon path under /assets. */
  icon: string;
  /** Monochrome dark icons that need inverting on a dark background. */
  invertIconInDark?: boolean;
  key: string;
  npmPackage: string;
  readme: { path: string; repo: string };
  tags: string[];
  title: string;
}

export interface PluginNpmInfo {
  createdAt: string;
  description: string;
  license: string;
  readme: string;
  updatedAt: string;
  version: string;
  weeklyNPMDownloads: number;
}

const registryRecord = registry as {
  plugins: Record<string, Omit<PluginRecord, 'key'>>;
  tags: string[];
};
const npmRecord = npmInfo as Record<string, PluginNpmInfo>;
const readmeRecord = readmes as Record<string, string>;

/** Every plugin in registry order (the order the old Plugin Hub sidebar used). */
export function getPlugins(): PluginRecord[] {
  return Object.entries(registryRecord.plugins).map(([key, value]) => ({ key, ...value }));
}

export function getPlugin(key: string): PluginRecord | undefined {
  const value = registryRecord.plugins[key];
  return value && { key, ...value };
}

export function getPluginTags(): string[] {
  return registryRecord.tags;
}

export function getPluginNpmInfo(key: string): PluginNpmInfo | undefined {
  return npmRecord[key];
}

/**
 * The plugin's readme as authored in its source repository, falling back to
 * the npm readme. Empty when neither is available.
 */
export function getPluginReadme(key: string): string {
  return readmeRecord[key] || npmRecord[key]?.readme || '';
}

/**
 * Demotes the readme's own headings one level (its h1 would compete with the
 * page title) without touching `#` lines inside fenced code blocks.
 */
export function demoteReadmeHeadings(markdown: string): string {
  let fence: string | undefined;
  return markdown
    .split('\n')
    .map(line => {
      const fenceMatch = line.match(/^\s*(`{3,}|~{3,})/);
      if (fenceMatch) {
        if (!fence) fence = fenceMatch[1];
        else if (fenceMatch[1].startsWith(fence[0]!) && fenceMatch[1].length >= fence.length)
          fence = undefined;
        return line;
      }
      return fence ? line : line.replace(/^(#{1,5}) /, '#$1 ');
    })
    .join('\n');
}

/** Short description for cards and indexes: npm's, or the readme's first paragraph. */
export function getPluginDescription(key: string): string {
  const fromNpm = npmRecord[key]?.description?.trim();
  if (fromNpm) return fromNpm;
  const readme = getPluginReadme(key);
  const paragraph = readme
    .replace(/^#.*$/gm, '')
    .replace(/!\[[^\]]*]\([^)]*\)/g, '')
    .split(/\n\s*\n/)
    .map(block => block.trim())
    .find(
      block =>
        block && !block.startsWith('```') && !block.startsWith('<') && !block.startsWith('|'),
    );
  return paragraph
    ? paragraph
        .replace(/\s+/g, ' ')
        .replace(/\[([^\]]+)]\([^)]*\)/g, '$1')
        .replace(/`/g, '')
        .slice(0, 200)
    : '';
}
