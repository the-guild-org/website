import { HIVE_SITE_URL as SITE_URL } from '~hive/lib/base-path';
import { getDocsNav } from '~hive/lib/docs-nav';
import { AUDIT_PATH, BENCHMARK_PATH } from '~hive/lib/gateway-reports-data';
import { AUDIT_MARKDOWN_TITLE, BENCHMARK_MARKDOWN_TITLE } from '~hive/lib/gateway-reports-markdown';
import { getLlmsText } from '~hive/lib/llms';
import { getCollection } from 'astro:content';

export const prerender = true;

export async function GET() {
  const [entries, { tree }] = await Promise.all([getCollection('docs'), getDocsNav()]);

  const reports = [
    '## Gateway reports',
    '',
    `- [${BENCHMARK_MARKDOWN_TITLE}](${SITE_URL}${BENCHMARK_PATH}.md): throughput, latency, CPU, memory and reliability of GraphQL federation routers`,
    `- [${AUDIT_MARKDOWN_TITLE}](${SITE_URL}${AUDIT_PATH}.md): Apollo Federation compatibility test results per gateway`,
    '',
  ].join('\n');

  return new Response(`${getLlmsText(entries, tree)}\n${reports}`, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
}
