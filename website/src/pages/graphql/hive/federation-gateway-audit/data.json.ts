import auditJson from '~hive/generated/federation-gateway-audit.json';

export const prerender = true;

/**
 * The audit results as the audit repository publishes them, at the URL the
 * old standalone page served them from, for existing consumers.
 */
export function GET() {
  return new Response(JSON.stringify(auditJson), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
