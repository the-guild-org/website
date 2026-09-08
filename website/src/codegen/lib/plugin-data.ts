/**
 * Data access for the plugin pages: the registry and npm metadata produced
 * by scripts/codegen/{fetch-content,fetch-npm-info}.ts, plus the Config API
 * Reference markdown regenerated from the committed config.schema.json
 * (usage examples are stripped from that schema upstream, so the reference
 * carries types/defaults/descriptions — the prose in each page carries the
 * examples).
 */
import configSchema from '../../../public/graphql/codegen/config.schema.json';
import configDocsMap from '../generated/config-docs-map.json';
import npmInfo from '../generated/npm-info.json';
import registry from '../generated/plugins-registry.json';

export interface PluginRecord {
  category: string;
  icon: string;
  /** Resolved local icon filename under /icons, when the icon is local. */
  iconFile?: string;
  key: string;
  npmPackage: string;
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

const registryRecord = registry as Record<
  string,
  {
    category: string;
    icon: string;
    iconFile?: string;
    npmPackage: string;
    tags: string[];
    title: string;
  }
>;
const npmRecord = npmInfo as Record<string, PluginNpmInfo>;

export function getPlugins(): PluginRecord[] {
  return Object.entries(registryRecord).map(([key, value]) => ({ key, ...value }));
}

export function getPlugin(key: string): PluginRecord | undefined {
  const value = registryRecord[key];
  return value && { key, ...value };
}

export function getPluginNpmInfo(key: string): PluginNpmInfo | undefined {
  return npmRecord[key];
}

interface SchemaProperty {
  default?: unknown;
  description?: string;
  items?: { type?: unknown };
  type?: unknown;
}

const definitions = (
  configSchema as { definitions: Record<string, { properties?: Record<string, SchemaProperty> }> }
).definitions;

const identifierByName = new Map(
  (configDocsMap as { identifier: string; name: string }[]).map(entry => [
    entry.name,
    entry.identifier,
  ]),
);

function typeLabel(property: SchemaProperty): string {
  const type = property.type;
  if (Array.isArray(type)) return type.join(' | ');
  if (type === 'array') {
    const item = property.items?.type;
    return item ? `${Array.isArray(item) ? item.join(' | ') : String(item)}[]` : 'array';
  }
  return typeof type === 'string' ? type : 'object';
}

/**
 * The Config API Reference markdown for a plugin page (by content file
 * name), or undefined when the plugin has no config interface in the
 * schema — those pages fall back to the npm readme.
 */
export function getConfigReferenceMarkdown(key: string): string | undefined {
  const identifier = identifierByName.get(key);
  const properties = identifier ? definitions[identifier]?.properties : undefined;
  if (!properties || Object.keys(properties).length === 0) return undefined;

  const sections = Object.entries(properties).map(([name, property]) => {
    const lines = [`### \`${name}\``, '', `type: \`${typeLabel(property)}\``];
    if (property.default !== undefined) {
      lines.push(`default: \`${JSON.stringify(property.default)}\``);
    }
    if (property.description) lines.push('', property.description);
    return lines.join('\n');
  });
  return `## Config API Reference\n\n${sections.join('\n\n')}`;
}
