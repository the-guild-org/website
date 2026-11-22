/**
 * Fetches the data behind the two gateway report pages into
 * src/hive/generated/ (gitignored):
 *
 * - /graphql/hive/federation-gateway-performance renders the per-second
 *   samples of graphql-hive/graphql-gateways-benchmark
 *   (website/stress-data.csv and website/constant-data.csv, written by its
 *   report workflow) → gateway-benchmark-stress.csv, gateway-benchmark-constant.csv
 * - /graphql/hive/federation-gateway-audit renders the results of
 *   graphql-hive/federation-gateway-audit (website/data.json, written by its
 *   src/summary.ts) → federation-gateway-audit.json
 *
 * Both repositories send a `federation-gateways-content-update` dispatch when
 * those files change on main, so the site rebuilds with the new results.
 *
 * The build fails if a file cannot be fetched or does not have the expected
 * shape: the pages are not published with missing numbers.
 *
 * Set GATEWAYS_BENCHMARK_REPO_DIR or FEDERATION_AUDIT_REPO_DIR to a local
 * clone to read the files from there instead, and GATEWAYS_BENCHMARK_REPO_REF
 * or FEDERATION_AUDIT_REPO_REF to fetch another branch, tag or SHA.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseAuditResults, parseBenchmarkCsv } from '../../src/hive/lib/gateway-reports.ts';
import { fetchWithRetry } from '../lib/npm-info.ts';

const outDir = fileURLToPath(new URL('../../src/hive/generated', import.meta.url));
mkdirSync(outDir, { recursive: true });

interface Source {
  envPrefix: string;
  repository: string;
}

const BENCHMARK: Source = {
  envPrefix: 'GATEWAYS_BENCHMARK',
  repository: 'graphql-hive/graphql-gateways-benchmark',
};
const AUDIT: Source = {
  envPrefix: 'FEDERATION_AUDIT',
  repository: 'graphql-hive/federation-gateway-audit',
};

async function read(source: Source, file: string): Promise<string> {
  const localDir = process.env[`${source.envPrefix}_REPO_DIR`];
  if (localDir) {
    console.log(`Reading ${file} from the local ${source.repository} clone at ${localDir}`);
    return readFileSync(join(localDir, file), 'utf8');
  }
  const ref = process.env[`${source.envPrefix}_REPO_REF`] ?? 'main';
  const url = `https://raw.githubusercontent.com/${source.repository}/${ref}/${file}`;
  console.log(`Fetching ${url}`);
  return (await fetchWithRetry(url)).text();
}

for (const scenario of ['stress', 'constant'] as const) {
  const file = `website/${scenario}-data.csv`;
  const content = await read(BENCHMARK, file);
  // Throws if a gateway the page shows has no samples.
  parseBenchmarkCsv(content, `${BENCHMARK.repository}/${file}`);
  writeFileSync(join(outDir, `gateway-benchmark-${scenario}.csv`), content);
}

{
  const file = 'website/data.json';
  const content = await read(AUDIT, file);
  parseAuditResults(JSON.parse(content), `${AUDIT.repository}/${file}`);
  writeFileSync(join(outDir, 'federation-gateway-audit.json'), content);
}

console.log('Wrote the gateway benchmark and audit results');
