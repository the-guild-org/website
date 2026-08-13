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

    await sendEmail(
      options.email,
      'contact@the-guild.dev',
      'uri.goldshtein@gmail.com',
      `Contact Us Form Submission - The Guild (${body.email})`,
      [`Name: ${body.name}`, `Email: ${body.email}`, `Notes: ${body.notes || ''}`].join('\n'),
      createMimeMessage().setSender(body.email),
    );

    console.debug(`Crisp user: `, crispUser);
    const crispContactLink = `https://app.crisp.chat/website/${options.crisp.websiteId}/contacts/profile/${crispUser.people_id}/`;

    await options.crisp.addCrispUserEvent(crispUser.people_id, {
      text: 'contact:website',
      data: {
        Details: `Contacted us through our website`,
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
