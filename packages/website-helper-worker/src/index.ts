import { Client } from '@notionhq/client';
import { handleConductorContact } from './contact-conductor';
import { buildResponseCorsHeaders } from './cors';
import { Env } from './env';

// eslint-disable-next-line import/no-default-export
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    try {
      const url = new URL(request.url);
      const notion = new Client({
        auth: env.NOTION_TOKEN,
      });

      if (request.method === 'OPTIONS') {
        return new Response(null, {
          headers: buildResponseCorsHeaders(request.headers),
        });
      }

      if (request.method === 'POST' && url.pathname === '/api/conductor') {
        return handleConductorContact({
          request,
          notion,
          notionDatabaseId: env.NOTION_CONDUCTOR_DATABASE_ID,
        });
      }

      return new Response(JSON.stringify({ error: 'not found' }), {
        status: 404,
        headers: {
          ...buildResponseCorsHeaders(request.headers),
          contentType: 'application/json',
        },
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: (e as Error).message }), { status: 500 });
    }
  },
};
