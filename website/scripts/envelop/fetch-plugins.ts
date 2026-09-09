/**
 * Completes the Plugin Hub data after fetch-content.ts:
 *  - npm registry metadata (version, license, dates, weekly downloads,
 *    description, readme) for every plugin, into
 *    src/envelop/generated/npm-info.json
 *  - the readmes of plugins hosted outside the Yoga repo (GraphQL Armor,
 *    Inngest, the Hive client), merged into src/envelop/generated/readmes.json
 * Failures degrade to placeholders so a flaky registry can't take the build
 * down — the affected page just misses its download count or shows the npm
 * readme until the next deploy. Results are reused from .cache/npm-info for
 * a day (see scripts/lib/npm-info.ts).
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  fetchPackage,
  fetchWithRetry,
  inBatches,
  loadNpmInfoCache,
  placeholderInfo,
  saveNpmInfoCache,
  type NpmInfo,
} from '../lib/npm-info.ts';
import { absolutizeReadmeLinks } from './readme-links.ts';

const projectDir = fileURLToPath(new URL('../..', import.meta.url));
const generatedDir = join(projectDir, 'src/envelop/generated');
const registryPath = join(generatedDir, 'plugins-registry.json');
const readmesPath = join(generatedDir, 'readmes.json');

if (!existsSync(registryPath)) {
  throw new Error('plugins-registry.json missing — run fetch-content.ts first');
}

const registry = JSON.parse(readFileSync(registryPath, 'utf8')) as {
  plugins: Record<string, { npmPackage: string; readme?: { path?: string; repo?: string } }>;
};
const readmes = JSON.parse(readFileSync(readmesPath, 'utf8')) as Record<string, string>;

const cache = loadNpmInfoCache('envelop');
const entries = Object.entries(registry.plugins);
const info: Record<string, NpmInfo> = {};
const fetched: Record<string, NpmInfo> = {};
const fetchedReadmes: Record<string, string> = {};
let failed = 0;
let reused = 0;

await inBatches(entries, async ([key, { npmPackage, readme }]) => {
  const cached = cache.packages[npmPackage];
  if (cached) {
    info[key] = cached;
    reused++;
  } else {
    try {
      info[key] = fetched[npmPackage] = await fetchPackage(npmPackage, '');
    } catch (error) {
      failed++;
      console.warn(`npm info failed for ${npmPackage}: ${(error as Error).message}`);
      info[key] = placeholderInfo('');
    }
  }
  if (readmes[key]) return;
  if (cache.readmes[key]) {
    readmes[key] = cache.readmes[key];
    return;
  }
  // Same caution as fetch-content.ts: the registry may come from a PR, so
  // only well-formed GitHub coordinates are fetched.
  const validSource =
    readme?.repo !== undefined &&
    readme.path !== undefined &&
    /^[\w.-]+\/[\w.-]+$/.test(readme.repo) &&
    !readme.path.split('/').some(segment => segment === '..' || segment === '');
  if (!validSource) return;
  try {
    const response = await fetchWithRetry(
      `https://raw.githubusercontent.com/${readme.repo}/HEAD/${readme.path}`,
    );
    readmes[key] = fetchedReadmes[key] = absolutizeReadmeLinks(
      await response.text(),
      readme.repo!,
      readme.path!,
    );
  } catch (error) {
    console.warn(`readme fetch failed for ${key}: ${(error as Error).message}`);
  }
});

writeFileSync(join(generatedDir, 'npm-info.json'), `${JSON.stringify(info, null, 2)}\n`);
writeFileSync(readmesPath, `${JSON.stringify(readmes, null, 2)}\n`);
// A fresh cache keeps its date so it still expires on schedule; an empty one starts today.
saveNpmInfoCache('envelop', {
  fetchedAt: cache.fetchedAt || new Date().toISOString(),
  packages: { ...cache.packages, ...fetched },
  readmes: { ...cache.readmes, ...fetchedReadmes },
});
console.log(
  `npm info for ${entries.length} plugins (${reused} from cache, ${failed} fallbacks), ${Object.keys(fetchedReadmes).length} readmes fetched from other repos`,
);
