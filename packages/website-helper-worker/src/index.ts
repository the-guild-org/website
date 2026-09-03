import { Toucan } from 'toucan-js';
import { handleContactUs } from './contact-guild';
import { buildResponseCorsHeaders } from './cors';
import { createCrispClient } from './crisp-client';
import { Env } from './env';
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

      const maybeBody = request.body ? await request.text() : null;

      sentry.setExtra('Body', maybeBody);

      if (request.method === 'POST' && url.pathname === '/api/contact-us') {
        return await handleContactUs({
          email: env.EMAIL_SENDER,
          request,
          body: maybeBody ? JSON.parse(maybeBody) : null,
          crisp,
        });
      }

      if (request.method === 'POST' && url.pathname === '/api/newsletter-subscribe') {
        return await handleSubscribeToNewsletter(
          {
            request,
            body: maybeBody ? JSON.parse(maybeBody) : null,
          },
          env.BEEHIIV_API_KEY,
        );
      }

      return new Response(JSON.stringify({ error: 'not found' }), {
        status: 404,
        headers: {
          ...buildResponseCorsHeaders(request.headers),
          contentType: 'application/json',
        },
      });
    } catch (e) {
      sentry.captureException(e);

      return new Response(JSON.stringify({ error: (e as Error).message }), { status: 500 });
    }
  },
};
