import { auditMarkdown } from '~hive/lib/gateway-reports-markdown';

export const prerender = true;

export function GET() {
  return new Response(auditMarkdown(), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
