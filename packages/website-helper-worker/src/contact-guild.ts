/* eslint-disable no-console */
import { createMimeMessage } from 'mimetext';
import { Client, isFullPage } from '@notionhq/client';
import { buildResponseCorsHeaders } from './cors';
import { CrispClient } from './crisp-client';
import { sendEmail } from './email';

export async function handleContactUs(options: {
  email: SendEmail;
  request: Request;
  body: Record<string, unknown>;
  notion: Client;
  crisp: CrispClient;
  notionDatabaseId: string;
}) {
  const body = options.body as {
    email: string;
    name: string;
    notes?: string;
  };

  if (body?.email && body?.name) {
    await sendEmail(
      options.email,
      'contact@the-guild.dev',
      'uri.goldshtein@gmail.com',
      `Contact Us Form Submission - The Guild (${body.email})`,
      [`Name: ${body.name}`, `Email: ${body.email}`, `Notes: ${body.notes || ''}`].join('\n'),
      createMimeMessage().setSender(body.email),
    );

    let crispUser = await options.crisp.getCrispUser(body.email);

    if (!crispUser) {
      console.info(`Creating new Crisp user for ${body.email} / ${body.name}`);

      crispUser = await options.crisp.addNewCrispUser({
        email: body.email,
        person: {
          nickname: body.name,
        },
      });
    }

    console.debug(`Crisp user: `, crispUser);
    const crispContactLink = `https://app.crisp.chat/website/${options.crisp.websiteId}/contacts/profile/${crispUser.people_id}/`;

    const pageData = await options.notion.pages
      .create({
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
          Created: {
            type: 'date',
            date: { start: new Date().toISOString() },
          },
          'Crisp Link': {
            type: 'url',
            url: crispContactLink,
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
      })
      .then(r => (isFullPage(r) ? r : null));

    await options.crisp.addCrispUserEvent(crispUser.people_id, {
      text: 'contact:website',
      data: {
        Details: `Contacted us through our website`,
        Notion: pageData?.url,
      },
      color: 'grey',
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        ...buildResponseCorsHeaders(options.request.headers),
        contentType: 'application/json',
      },
    });
  }

  throw new Error('Invalid contact-us form input');
}
