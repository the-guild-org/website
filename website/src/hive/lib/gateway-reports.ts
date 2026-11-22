/**
 * The data contract of the two gateway report pages, shared by the fetch
 * script (scripts/hive/fetch-gateway-reports.ts, which validates) and the
 * pages (which render). Plain TypeScript without path aliases, so Node can
 * run it from the fetch script.
 */

// ---------------------------------------------------------------------------
// Performance benchmark (graphql-hive/graphql-gateways-benchmark)
// ---------------------------------------------------------------------------

export type BenchmarkScenario = 'stress' | 'constant';

export interface BenchmarkGateway {
  color: string;
  /** The gateway's directory name in the benchmark repo, and its CSV key. */
  id: string;
  name: string;
  website: string;
}

/**
 * The gateways the page compares, in chart order. The benchmark measures a
 * few more (Hive Gateway, Apollo Gateway, …); the page covers the routers.
 */
export const BENCHMARK_GATEWAYS: BenchmarkGateway[] = [
  {
    color: '#fc5200',
    id: 'apollo-router',
    name: 'Apollo Router',
    website: 'https://github.com/apollographql/router',
  },
  {
    color: '#ea4899',
    id: 'cosmo',
    name: 'Cosmo Router',
    website: 'https://github.com/wundergraph/cosmo',
  },
  {
    color: '#4a9c6d',
    id: 'grafbase',
    name: 'Grafbase Gateway',
    website: 'https://github.com/grafbase/grafbase',
  },
  {
    color: '#6b8f00',
    id: 'hive-router',
    name: 'Hive Router',
    website: 'https://the-guild.dev/graphql/hive/docs/router',
  },
];

export interface BenchmarkSample {
  cpu: number;
  /** Resident memory in MB. */
  memory: number;
  p95: number;
  rps: number;
  /** Share of successful requests, 0–100. */
  success: number;
  vus: number;
}

const CSV_COLUMNS = [
  'Gateway',
  'Seconds',
  'VUs',
  'RPS',
  'P95_ms',
  'Req_success_rate',
  'Total_CPU',
  'Total_RSS_KB',
];

/** Samples per gateway id, in the order the monitor recorded them. */
export type BenchmarkSamples = Map<string, BenchmarkSample[]>;

export function parseBenchmarkCsv(content: string, source: string): BenchmarkSamples {
  const [header, ...lines] = content.split('\n').filter(line => line.trim() !== '');
  if (header?.trim() !== CSV_COLUMNS.join(',')) {
    throw new Error(`${source} does not start with the header ${CSV_COLUMNS.join(',')}`);
  }
  const samples: BenchmarkSamples = new Map();
  for (const line of lines) {
    const [gateway, ...cells] = line.split(',').map(cell => cell.trim());
    const values = cells.map(Number);
    if (!gateway || values.length !== CSV_COLUMNS.length - 1 || values.some(Number.isNaN)) {
      throw new Error(`${source} has an invalid row: ${line}`);
    }
    const [, vus, rps, p95, success, cpu, rssKb] = values as number[];
    const list = samples.get(gateway) ?? [];
    list.push({
      cpu: cpu!,
      memory: rssKb! / 1024,
      p95: p95!,
      rps: rps!,
      success: success! * 100,
      vus: vus!,
    });
    samples.set(gateway, list);
  }
  const missing = BENCHMARK_GATEWAYS.filter(({ id }) => !samples.get(id)?.length);
  if (missing.length > 0) {
    throw new Error(`${source} has no samples for ${missing.map(({ id }) => id).join(', ')}`);
  }
  return samples;
}

export interface BenchmarkSummary {
  gateway: BenchmarkGateway;
  maxCpu: number;
  maxMemory: number;
  maxP95: number;
  medianP95: number;
  medianRps: number;
  /** Lowest share of successful requests in any sample, 0–100. */
  minSuccess: number;
  peakRps: number;
}

function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle]! : (sorted[middle - 1]! + sorted[middle]!) / 2;
}

/** One row per displayed gateway, fastest first. */
export function summarizeBenchmark(samples: BenchmarkSamples): BenchmarkSummary[] {
  return BENCHMARK_GATEWAYS.map(gateway => {
    const list = samples.get(gateway.id)!;
    return {
      gateway,
      maxCpu: Math.max(...list.map(sample => sample.cpu)),
      maxMemory: Math.max(...list.map(sample => sample.memory)),
      maxP95: Math.max(...list.map(sample => sample.p95)),
      medianP95: median(list.map(sample => sample.p95)),
      medianRps: median(list.map(sample => sample.rps)),
      minSuccess: Math.min(...list.map(sample => sample.success)),
      peakRps: Math.max(...list.map(sample => sample.rps)),
    };
  }).sort((a, b) => b.peakRps - a.peakRps);
}

// ---------------------------------------------------------------------------
// Federation compatibility audit (graphql-hive/federation-gateway-audit)
// ---------------------------------------------------------------------------

export interface AuditCounts {
  failed: number;
  passed: number;
  total: number;
}

export interface AuditResult {
  cases: AuditCounts;
  /** Anchor of the gateway's section in the audit's REPORT.md. */
  id?: string;
  name: string;
  repository?: string;
  suites: AuditCounts;
  website?: string;
}

function isCounts(value: unknown): value is AuditCounts {
  const counts = (value ?? {}) as Record<string, unknown>;
  return ['failed', 'passed', 'total'].every(key => Number.isInteger(counts[key]));
}

const optionalString = (value: unknown) => value === undefined || typeof value === 'string';

export function parseAuditResults(json: unknown, source: string): AuditResult[] {
  if (!Array.isArray(json) || json.length === 0) {
    throw new Error(`${source} is not a non-empty list of gateway results`);
  }
  for (const entry of json) {
    const result = (entry ?? {}) as Record<string, unknown>;
    if (
      typeof result.name !== 'string' ||
      !isCounts(result.cases) ||
      !isCounts(result.suites) ||
      !optionalString(result.id) ||
      !optionalString(result.website) ||
      !optionalString(result.repository)
    ) {
      throw new Error(`${source} has an invalid gateway result: ${JSON.stringify(entry)}`);
    }
  }
  return json as AuditResult[];
}

/** Share of passed test cases, 0–100. */
export const auditScore = (result: AuditResult) => (result.cases.passed * 100) / result.cases.total;
