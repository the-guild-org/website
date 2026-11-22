import { benchmarkMarkdown } from '~hive/lib/gateway-reports-markdown';

export const prerender = true;

export function GET() {
  return new Response(benchmarkMarkdown(), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
