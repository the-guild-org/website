import { Toucan } from 'toucan-js';
import { handleContactUs } from './contact-guild';
import { buildResponseCorsHeaders } from './cors';
import { createCrispClient } from './crisp-client';
import { Env } from './env';
import { jsonResponse } from './http';
import { handleSubscribeToNewsletter } from './newsletter-subscribe';

export default {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async fetch(request: Request, env: Env, context: any): Promise<Response> {
    const sentry = new Toucan({
      dsn: env.SENTRY_DSN,
      context,
      request,
      attachStacktrace: true,
      autoSessionTracking: true,
      sendDefaultPii: true,
    });

    sentry.setExtra('Url', request.url);
    sentry.setExtra('Method', request.method);

    try {
      const url = new URL(request.url);
      const crisp = createCrispClient({
        token: env.CRISP_TOKEN,
        websiteId: env.CRISP_WEBSITE_ID,
      });

      if (request.method === 'OPTIONS') {
        return new Response(null, {
          headers: buildResponseCorsHeaders(request.headers),
        });
      }

      // The body carries contact PII (name, email, notes) and must not be
      // attached to the Sentry scope.
      const maybeBody = request.body ? await request.text() : null;

      let body: unknown = null;
      if (maybeBody) {
        try {
          body = JSON.parse(maybeBody);
        } catch {
          return jsonResponse({ error: 'Invalid JSON body' }, 400, request.headers);
        }
      }

      if (request.method === 'POST' && url.pathname === '/api/contact-us') {
        return await handleContactUs({
          email: env.EMAIL_SENDER,
          request,
          body,
          crisp,
        });
      }

      if (request.method === 'POST' && url.pathname === '/api/newsletter-subscribe') {
        return await handleSubscribeToNewsletter({ request, body }, env.BEEHIIV_API_KEY);
      }

      return jsonResponse({ error: 'not found' }, 404, request.headers);
    } catch (e) {
      sentry.captureException(e);

      // The detailed error goes to Sentry; the client gets a generic message
      // rather than internal upstream details.
      return jsonResponse({ error: 'Internal error' }, 500, request.headers);
    }
  },
};
