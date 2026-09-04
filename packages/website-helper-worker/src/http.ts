import { buildResponseCorsHeaders } from './cors';

/**
 * Every response this worker produces is JSON consumed cross-origin from
 * the-guild.dev, so the content type and CORS headers always travel together
 * (a 500 without CORS headers is invisible to the browser - it surfaces as an
 * opaque "Failed to fetch" instead of the actual error).
 */
export function jsonResponse(body: unknown, status: number, requestHeaders: Headers): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...buildResponseCorsHeaders(requestHeaders),
      'content-type': 'application/json',
    },
  });
}
