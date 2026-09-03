import { createMimeMessage } from 'mimetext';
import { buildResponseCorsHeaders } from './cors';
import { CrispClient } from './crisp-client';
import { sendEmail } from './email';

export async function handleContactUs(options: {
  email: SendEmail;
  request: Request;
  body: Record<string, unknown>;
  crisp: CrispClient;
}) {
  console.log('handling contact us');

  const body = options.body as {
    email: string;
    name: string;
    notes?: string;
  };

  console.log('body', body);

  if (body?.email && body?.name) {
    console.log('valid body');

    await sendEmail(
      options.email,
      'contact@the-guild.dev',
      'contact@the-guild.dev',
      `Contact Us Form Submission - The Guild (${body.email})`,
      [`Name: ${body.name}`, `Email: ${body.email}`, `Notes: ${body.notes || ''}`].join('\n'),
      createMimeMessage().setSender(body.email),
    );

    console.log('email sent');
    console.log('syncing crisp');

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

    console.log(`Crisp user: `, crispUser);
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
