/**
 * Fetches npm registry metadata (readme, version, dates, weekly downloads)
 * for every package in the codegen plugins registry, into
 * src/codegen/generated/npm-info.json (gitignored). Run after
 * fetch-content.ts. Failures degrade to placeholder entries so a flaky npm
 * response can't take the build down — the affected page just misses its
 * download count / readme until the next deploy.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectDir = fileURLToPath(new URL('../..', import.meta.url));
const generatedDir = join(projectDir, 'src/codegen/generated');
const registryPath = join(generatedDir, 'plugins-registry.json');

if (!existsSync(registryPath)) {
  throw new Error('plugins-registry.json missing — run fetch-content.ts first');
}

interface NpmInfo {
  createdAt: string;
  description: string;
  license: string;
  readme: string;
  updatedAt: string;
  version: string;
  weeklyNPMDownloads: number;
}

const registry = JSON.parse(readFileSync(registryPath, 'utf8')) as Record<
  string,
  { npmPackage: string }
>;

async function fetchJson(url: string, attempts = 3): Promise<unknown> {
  for (let attempt = 1; ; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`${response.status} for ${url}`);
      return await response.json();
    } catch (error) {
      if (attempt >= attempts) throw error;
      await new Promise(resolve => setTimeout(resolve, attempt * 1000));
    }
  }
}

async function fetchPackage(npmPackage: string): Promise<NpmInfo> {
  const encoded = encodeURIComponent(npmPackage);
  const [pkg, downloads] = await Promise.all([
    fetchJson(`https://registry.npmjs.org/${encoded}`) as Promise<{
      description?: string;
      'dist-tags'?: { latest?: string };
      license?: string;
      readme?: string;
      time?: Record<string, string>;
      versions?: Record<string, { license?: string }>;
    }>,
    fetchJson(`https://api.npmjs.org/downloads/point/last-week/${encoded}`).catch(() => ({
      downloads: 0,
    })) as Promise<{ downloads?: number }>,
  ]);
  const version = pkg['dist-tags']?.latest ?? '';
  const readme = pkg.readme ?? '';
  return {
    createdAt: pkg.time?.created ?? '',
    description: pkg.description ?? '',
    license: pkg.license ?? pkg.versions?.[version]?.license ?? 'MIT',
    readme: readme === 'ERROR: No README data found!' ? '' : readme,
    updatedAt: (version && pkg.time?.[version]) || pkg.time?.modified || '',
    version,
    weeklyNPMDownloads: downloads.downloads ?? 0,
  };
}

const entries = Object.entries(registry);
const info: Record<string, NpmInfo> = {};
let failed = 0;

// Modest concurrency; the registry throttles bursts.
const CONCURRENCY = 8;
for (let index = 0; index < entries.length; index += CONCURRENCY) {
  await Promise.all(
    entries.slice(index, index + CONCURRENCY).map(async ([key, { npmPackage }]) => {
      try {
        info[key] = await fetchPackage(npmPackage);
      } catch (error) {
        failed++;
        console.warn(`npm info failed for ${npmPackage}: ${(error as Error).message}`);
        info[key] = {
          createdAt: '',
          description: '',
          license: 'MIT',
          readme: '',
          updatedAt: '',
          version: '',
          weeklyNPMDownloads: 0,
        };
      }
    }),
  );
}

writeFileSync(join(generatedDir, 'npm-info.json'), `${JSON.stringify(info, null, 2)}\n`);
console.log(`npm info for ${entries.length} packages (${failed} fallbacks)`);
