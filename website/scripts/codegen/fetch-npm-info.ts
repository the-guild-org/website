/**
 * Fetches npm registry metadata (readme, version, dates, weekly downloads)
 * for every package in the codegen plugins registry, into
 * src/codegen/generated/npm-info.json (gitignored). Run after
 * fetch-content.ts. Failures degrade to placeholder entries so a flaky npm
 * response can't take the build down — the affected page just misses its
 * download count / readme until the next deploy. Results are reused from
 * .cache/npm-info for a day (see scripts/lib/npm-info.ts).
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  fetchPackage,
  inBatches,
  loadNpmInfoCache,
  placeholderInfo,
  saveNpmInfoCache,
  type NpmInfo,
} from '../lib/npm-info.ts';

const projectDir = fileURLToPath(new URL('../..', import.meta.url));
const generatedDir = join(projectDir, 'src/codegen/generated');
const registryPath = join(generatedDir, 'plugins-registry.json');

if (!existsSync(registryPath)) {
  throw new Error('plugins-registry.json missing — run fetch-content.ts first');
}

const registry = JSON.parse(readFileSync(registryPath, 'utf8')) as Record<
  string,
  { npmPackage: string }
>;

const cache = loadNpmInfoCache('codegen');
const entries = Object.entries(registry);
const info: Record<string, NpmInfo> = {};
const fetched: Record<string, NpmInfo> = {};
let failed = 0;
let reused = 0;

await inBatches(entries, async ([key, { npmPackage }]) => {
  const cached = cache.packages[npmPackage];
  if (cached) {
    info[key] = cached;
    reused++;
    return;
  }
  try {
    info[key] = fetched[npmPackage] = await fetchPackage(npmPackage, 'MIT');
  } catch (error) {
    failed++;
    console.warn(`npm info failed for ${npmPackage}: ${(error as Error).message}`);
    info[key] = placeholderInfo('MIT');
  }
});

writeFileSync(join(generatedDir, 'npm-info.json'), `${JSON.stringify(info, null, 2)}\n`);
// A fresh cache keeps its date so it still expires on schedule; a full fetch starts a new day.
saveNpmInfoCache('codegen', {
  fetchedAt: reused > 0 ? cache.fetchedAt : new Date().toISOString(),
  packages: { ...cache.packages, ...fetched },
  readmes: {},
});
console.log(`npm info for ${entries.length} packages (${reused} from cache, ${failed} fallbacks)`);
