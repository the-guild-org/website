import { Client } from '@notionhq/client';

export async function handleJoinUs(options: {
  request: Request;
  body: Record<string, unknown>;
  notion: Client;
  notionDatabaseId: string;
}) {


  if (!options.request) {
    return new Response(JSON.stringify({ message: 'No request found' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const body = options.body as {
    email: string;
    name: string;
    notes?: string;
  };

  if (!body?.email || !body?.name) {
    return new Response(JSON.stringify({ error: 'Invalid input' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const page = await options.notion.pages.create({
    parent: {
      database_id: options.notionDatabaseId,
    },
    properties: {
      Name: {
        title: [{ text: { content: body.name } }],
      },
      Email: {
        email: body.email,
      },
      Created: {
        date: { start: new Date().toISOString() },
      },
      Notes: {
        rich_text: [
          {
            text: { content: body.notes || '' },
          },
        ],
      },
    },
  });

  return new Response(JSON.stringify({ success: true, page }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
