import { Client } from '@notionhq/client';
import { handleConductorContact } from './contact-conductor';
import { handleContactUs } from './contact-guild';
import { buildResponseCorsHeaders } from './cors';
import { createCrispClient } from './crisp-client';
import { Env } from './env';
import { Toucan } from 'toucan-js';
import { handleSubscribeToNewsletter } from './newsletter-subscribe';

// eslint-disable-next-line import/no-default-export
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

    sentry.configureScope(scope => {
      scope.setExtra('Url', request.url);
      scope.setExtra('Method', request.method);
    });

    try {
      const url = new URL(request.url);
      const crisp = createCrispClient({
        token: env.CRISP_TOKEN,
        websiteId: env.CRISP_WEBSITE_ID,
      });
      const notion = new Client({
        auth: env.NOTION_TOKEN,
      });

      if (request.method === 'OPTIONS') {
        return new Response(null, {
          headers: buildResponseCorsHeaders(request.headers),
        });
      }

      const maybeBody = request.body ? await request.text() : null;

      sentry.configureScope(scope => {
        scope.setExtra('Body', maybeBody);
      });

      if (request.method === 'POST' && url.pathname === '/api/conductor') {
        return await handleConductorContact({
          request,
          body: maybeBody ? JSON.parse(maybeBody) : null,
          notion,
          notionDatabaseId: env.NOTION_CONDUCTOR_DATABASE_ID,
        });
      }

      if (request.method === 'POST' && url.pathname === '/api/contact-us') {
        return await handleContactUs({
          request,
          body: maybeBody ? JSON.parse(maybeBody) : null,
          crisp,
          notion,
          notionDatabaseId: env.NOTION_CONTACT_US_DATABASE_ID,
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
