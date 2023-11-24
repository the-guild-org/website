import { Client } from '@notionhq/client';
import { buildResponseCorsHeaders } from './cors';

export async function handleHeltinContact(options: {
  request: Request;
  body: Record<string, unknown>;
  notion: Client;
  notionDatabaseId: string;
}) {
  const body = options.body as {
    name: string;
    email: string;
    notes?: string;
  };

  if (body?.email && body?.name) {
    await options.notion.pages.create({
      parent: {
        database_id: options.notionDatabaseId,
        type: 'database_id',
      },
      properties: {
        Name: {
          type: 'title',
          title: [{ type: 'text', text: { content: body.name } }],
        },
        Email: {
          type: 'email',
          email: body.email,
        },
        Date: {
          type: 'date',
          date: { start: new Date().toISOString() },
        },
        Notes: {
          type: 'rich_text',
          rich_text: [
            {
              text: {
                content: body.notes || '',
              },
            },
          ],
        },
      },
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        ...buildResponseCorsHeaders(options.request.headers),
        contentType: 'application/json',
      },
    });
  }

  throw new Error('Invalid heltin signup input');
}
