/**
 * npm registry metadata for the plugin hubs, with a cross-build cache.
 *
 * The registry document of a package lists every version ever published; for
 * the Codegen plugins that is 20–27 MB each, so fetching a hundred of them is
 * the slowest part of the build. The results change slowly (a version bump,
 * a readme edit, the weekly download count), so they are kept in
 * `.cache/npm-info/<hub>.json` and reused for a day. CI restores that
 * directory between runs; set NPM_INFO_REFRESH=1 to ignore it.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

export interface NpmInfo {
  createdAt: string;
  description: string;
  license: string;
  readme: string;
  updatedAt: string;
  version: string;
  weeklyNPMDownloads: number;
}

export interface NpmInfoCache {
  /** When the packages below were last fetched in full. */
  fetchedAt: string;
  /** Keyed by npm package name. Only successful fetches are stored. */
  packages: Record<string, NpmInfo>;
  /** Readmes fetched from other GitHub repos, keyed by plugin id. */
  readmes: Record<string, string>;
}

const cacheDir = fileURLToPath(new URL('../../.cache/npm-info', import.meta.url));
const TTL_MS = 24 * 60 * 60 * 1000;

/** Modest concurrency; the registry throttles bursts. */
export const CONCURRENCY = 2;

export function loadNpmInfoCache(hub: string): NpmInfoCache {
  const file = join(cacheDir, `${hub}.json`);
  const empty: NpmInfoCache = { fetchedAt: '', packages: {}, readmes: {} };
  if (process.env.NPM_INFO_REFRESH || !existsSync(file)) return empty;
  try {
    const cache = JSON.parse(readFileSync(file, 'utf8')) as Partial<NpmInfoCache>;
    const age = Date.now() - Date.parse(cache.fetchedAt ?? '');
    if (!(age >= 0 && age < TTL_MS)) return empty;
    return {
      fetchedAt: cache.fetchedAt!,
      packages: cache.packages ?? {},
      readmes: cache.readmes ?? {},
    };
  } catch {
    return empty;
  }
}

export function saveNpmInfoCache(hub: string, cache: NpmInfoCache): void {
  mkdirSync(cacheDir, { recursive: true });
  writeFileSync(join(cacheDir, `${hub}.json`), `${JSON.stringify(cache)}\n`);
}

export async function fetchWithRetry(url: string, attempts = 3): Promise<Response> {
  for (let attempt = 1; ; attempt++) {
    try {
      // A stalled registry request would otherwise hold its whole batch.
      const response = await fetch(url, { signal: AbortSignal.timeout(60_000) });
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

export const fetchJson = async (url: string, attempts = 3): Promise<unknown> =>
  (await fetchWithRetry(url, attempts)).json() as Promise<unknown>;

export async function fetchPackage(npmPackage: string, licenseFallback: string): Promise<NpmInfo> {
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
      // A zero here shows up as missing download counts on the site — warn
      // so a throttled run is visible in the build log.
      console.warn(`downloads fetch failed for ${npmPackage}: ${(error as Error).message}`);
      return { downloads: 0 };
    }) as Promise<{ downloads?: number }>,
  ]);
  const version = pkg['dist-tags']?.latest ?? '';
  const readme = pkg.readme ?? '';
  return {
    createdAt: pkg.time?.created ?? '',
    description: pkg.description ?? '',
    license: pkg.license ?? pkg.versions?.[version]?.license ?? licenseFallback,
    readme: readme === 'ERROR: No README data found!' ? '' : readme,
    updatedAt: (version && pkg.time?.[version]) || pkg.time?.modified || '',
    version,
    weeklyNPMDownloads: downloads.downloads ?? 0,
  };
}

export const placeholderInfo = (licenseFallback: string): NpmInfo => ({
  createdAt: '',
  description: '',
  license: licenseFallback,
  readme: '',
  updatedAt: '',
  version: '',
  weeklyNPMDownloads: 0,
});

/** Runs `work` over `items`, at most CONCURRENCY at a time. */
export async function inBatches<T>(items: T[], work: (item: T) => Promise<void>): Promise<void> {
  for (let index = 0; index < items.length; index += CONCURRENCY) {
    await Promise.all(items.slice(index, index + CONCURRENCY).map(work));
  }
}
