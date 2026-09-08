/**
 * Completes the Plugin Hub data after fetch-content.ts:
 *  - npm registry metadata (version, license, dates, weekly downloads,
 *    description, readme) for every plugin, into
 *    src/envelop/generated/npm-info.json
 *  - the readmes of plugins hosted outside the Yoga repo (GraphQL Armor,
 *    Inngest, the Hive client), merged into src/envelop/generated/readmes.json
 * Failures degrade to placeholders so a flaky registry can't take the build
 * down — the affected page just misses its download count or shows the npm
 * readme until the next deploy.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { absolutizeReadmeLinks } from './readme-links.ts';

const projectDir = fileURLToPath(new URL('../..', import.meta.url));
const generatedDir = join(projectDir, 'src/envelop/generated');
const registryPath = join(generatedDir, 'plugins-registry.json');
const readmesPath = join(generatedDir, 'readmes.json');

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

const registry = JSON.parse(readFileSync(registryPath, 'utf8')) as {
  plugins: Record<string, { npmPackage: string; readme?: { path?: string; repo?: string } }>;
};
const readmes = JSON.parse(readFileSync(readmesPath, 'utf8')) as Record<string, string>;

async function fetchWithRetry(url: string, attempts = 3): Promise<Response> {
  for (let attempt = 1; ; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`${response.status} for ${url}`);
      return response;
    } catch (error) {
      if (attempt >= attempts) throw error;
      // npm rate-limits bursts with 429s; back off harder for those.
      const rateLimited = (error as Error).message.startsWith('429');
      await new Promise(resolve => setTimeout(resolve, attempt * (rateLimited ? 5000 : 2000)));
    }
  }
}
const fetchJson = async (url: string, attempts?: number) =>
  (await fetchWithRetry(url, attempts)).json() as Promise<unknown>;

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
    fetchJson(`https://api.npmjs.org/downloads/point/last-week/${encoded}`, 5).catch(error => {
      console.warn(`downloads fetch failed for ${npmPackage}: ${(error as Error).message}`);
      return { downloads: 0 };
    }) as Promise<{ downloads?: number }>,
  ]);
  const version = pkg['dist-tags']?.latest ?? '';
  const readme = pkg.readme ?? '';
  return {
    createdAt: pkg.time?.created ?? '',
    description: pkg.description ?? '',
    license: pkg.license ?? pkg.versions?.[version]?.license ?? '',
    readme: readme === 'ERROR: No README data found!' ? '' : readme,
    updatedAt: (version && pkg.time?.[version]) || pkg.time?.modified || '',
    version,
    weeklyNPMDownloads: downloads.downloads ?? 0,
  };
}

const entries = Object.entries(registry.plugins);
const info: Record<string, NpmInfo> = {};
let failed = 0;
let fetchedReadmes = 0;

// Modest concurrency; the registry throttles bursts.
const CONCURRENCY = 2;
for (let index = 0; index < entries.length; index += CONCURRENCY) {
  await Promise.all(
    entries.slice(index, index + CONCURRENCY).map(async ([key, { npmPackage, readme }]) => {
      try {
        info[key] = await fetchPackage(npmPackage);
      } catch (error) {
        failed++;
        console.warn(`npm info failed for ${npmPackage}: ${(error as Error).message}`);
        info[key] = {
          createdAt: '',
          description: '',
          license: '',
          readme: '',
          updatedAt: '',
          version: '',
          weeklyNPMDownloads: 0,
        };
      }
      // Same caution as fetch-content.ts: the registry may come from a PR, so
      // only well-formed GitHub coordinates are fetched.
      const validSource =
        readme?.repo !== undefined &&
        readme.path !== undefined &&
        /^[\w.-]+\/[\w.-]+$/.test(readme.repo) &&
        !readme.path.split('/').some(segment => segment === '..' || segment === '');
      if (!readmes[key] && validSource) {
        try {
          const response = await fetchWithRetry(
            `https://raw.githubusercontent.com/${readme.repo}/HEAD/${readme.path}`,
          );
          readmes[key] = absolutizeReadmeLinks(await response.text(), readme.repo!, readme.path!);
          fetchedReadmes++;
        } catch (error) {
          console.warn(`readme fetch failed for ${key}: ${(error as Error).message}`);
        }
      }
    }),
  );
}

writeFileSync(join(generatedDir, 'npm-info.json'), `${JSON.stringify(info, null, 2)}\n`);
writeFileSync(readmesPath, `${JSON.stringify(readmes, null, 2)}\n`);
console.log(
  `npm info for ${entries.length} plugins (${failed} fallbacks), ${fetchedReadmes} readmes fetched from other repos`,
);
