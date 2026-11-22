/**
 * Markdown versions of the gateway report pages, for LLMs (listed in
 * llms.txt) — the results and methodology without the charts.
 */
import { HIVE_SITE_URL as SITE_URL } from './base-path';
import { auditScore, summarizeBenchmark } from './gateway-reports';
import {
  AUDIT_PATH,
  AUDIT_REPOSITORY,
  auditResults,
  BENCHMARK_PATH,
  BENCHMARK_REPOSITORY,
  benchmarkSamples,
} from './gateway-reports-data';

const round = (value: number) => Math.round(value).toLocaleString('en-US');
const percent = (value: number) => (value === 100 ? '100%' : `${value.toFixed(2)}%`);

export const AUDIT_MARKDOWN_TITLE = 'Apollo Federation Compatibility Audit of GraphQL Gateways';
export const BENCHMARK_MARKDOWN_TITLE = 'GraphQL Federation Gateways Performance Benchmark';

export function auditMarkdown(): string {
  const { cases, suites } = auditResults[0]!;
  const rows = auditResults.map(
    result =>
      `| ${result.website ? `[${result.name}](${result.website})` : result.name} | ${auditScore(result).toFixed(2)}% | ${result.cases.passed} passed, ${result.cases.failed} failed | ${result.suites.passed} passed, ${result.suites.failed} failed |`,
  );
  return [
    `# ${AUDIT_MARKDOWN_TITLE}`,
    '',
    `> The following GraphQL Gateways support acting as an Apollo Federation Gateway. Each runs ${cases.total} test cases in ${suites.total} test suites of the open-source audit (${AUDIT_REPOSITORY}); compatibility is the share of test cases passed.`,
    '',
    '| Gateway | Compatibility | Test cases | Test suites |',
    '| :-- | --: | :-- | :-- |',
    ...rows,
    '',
    `Detailed per-test results: ${AUDIT_REPOSITORY}/blob/main/REPORT.md`,
    '',
    '## Methodology',
    '',
    'The audit measures the correctness and compliance of gateways with the Apollo Federation specification, not performance. Each test suite starts a set of subgraphs alongside a gateway, runs its test cases sequentially (covering error handling as well as directives such as `@interfaceObject`, `@key`, `@external`, `@provides`, `@requires`, `@extends`, `@inaccessible`, `@shareable`, `@composeDirective` and `@override`), and the compatibility score is the percentage of test cases passed. The tests run against the latest version of each gateway.',
    '',
    `Performance of the same gateways: ${SITE_URL}${BENCHMARK_PATH}.md`,
    '',
  ].join('\n');
}

export function benchmarkMarkdown(): string {
  const scenarios = [
    {
      id: 'stress' as const,
      intro: 'k6 ramps to 500 virtual users over 60 seconds.',
      rps: 'peakRps' as const,
      rpsLabel: 'Peak RPS',
      title: 'Stress test',
    },
    {
      id: 'constant' as const,
      intro: 'k6 holds 50 virtual users for 60 seconds, measuring baseline efficiency.',
      rps: 'medianRps' as const,
      rpsLabel: 'Median RPS',
      title: 'Low and constant traffic',
    },
  ];
  const sections = scenarios.flatMap(scenario => [
    `## ${scenario.title}`,
    '',
    scenario.intro,
    '',
    `| Gateway | ${scenario.rpsLabel} | p95 (median) | p95 (max) | CPU (max) | Memory (max) | Reliability |`,
    '| :-- | --: | --: | --: | --: | --: | --: |',
    ...summarizeBenchmark(benchmarkSamples[scenario.id]).map(
      row =>
        `| [${row.gateway.name}](${row.gateway.website}) | ${round(row[scenario.rps])} req/s | ${round(row.medianP95)} ms | ${round(row.maxP95)} ms | ${round(row.maxCpu)}% | ${round(row.maxMemory)} MB | ${percent(row.minSuccess)} |`,
    ),
    '',
  ]);
  return [
    `# ${BENCHMARK_MARKDOWN_TITLE}`,
    '',
    `> A reproducible benchmark of GraphQL federation routers: throughput (RPS), p95 latency, CPU and memory footprint, and reliability under a stress test and under low, constant traffic. Raw data and setup: ${BENCHMARK_REPOSITORY}.`,
    '',
    'Environment: Azure Standard D4s v4 VM (4 vCPUs, 16 GiB memory, Ubuntu 24.04). The gateway is restricted to 3 CPU cores and k6 to 1. A 15-second warm-up precedes the measurement; a monitor samples the metrics every 0.2 seconds. Reliability is the lowest share of successful requests in any sample (GraphQL errors count as failures). Every gateway runs the same supergraph of four subgraphs and the same heavy query.',
    '',
    ...sections,
    `Apollo Federation compatibility of the same gateways: ${SITE_URL}${AUDIT_PATH}.md`,
    '',
  ].join('\n');
}
