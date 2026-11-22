/**
 * The fetched gateway report data (scripts/hive/fetch-gateway-reports.ts),
 * parsed once for every page that renders it. Pages read it from here, never
 * from the-guild.dev: a build must not depend on the live site.
 */
import auditJson from '../generated/federation-gateway-audit.json';
import constantCsv from '../generated/gateway-benchmark-constant.csv?raw';
import stressCsv from '../generated/gateway-benchmark-stress.csv?raw';
import {
  parseAuditResults,
  parseBenchmarkCsv,
  type BenchmarkSamples,
  type BenchmarkScenario,
} from './gateway-reports';

export const AUDIT_PATH = '/federation-gateway-audit';
export const BENCHMARK_PATH = '/federation-gateway-performance';
export const AUDIT_REPOSITORY = 'https://github.com/graphql-hive/federation-gateway-audit';
export const BENCHMARK_REPOSITORY = 'https://github.com/graphql-hive/graphql-gateways-benchmark';

/** Audit results, best score first (the audit already writes them in that order). */
export const auditResults = parseAuditResults(auditJson, 'federation-gateway-audit.json');

export const benchmarkSamples: Record<BenchmarkScenario, BenchmarkSamples> = {
  constant: parseBenchmarkCsv(constantCsv, 'gateway-benchmark-constant.csv'),
  stress: parseBenchmarkCsv(stressCsv, 'gateway-benchmark-stress.csv'),
};
