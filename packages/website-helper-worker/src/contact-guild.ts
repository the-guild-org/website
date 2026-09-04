import { createMimeMessage } from 'mimetext';
import { CrispClient } from './crisp-client';
import { sendEmail } from './email';
import { jsonResponse } from './http';

export async function handleContactUs(options: {
  email: SendEmail;
  request: Request;
  body: unknown;
  crisp: CrispClient;
}) {
  const body = options.body as {
    email?: string;
    name?: string;
    notes?: string;
  } | null;

  if (!body?.email || !body?.name) {
    return jsonResponse({ error: 'Name and email are required' }, 400, options.request.headers);
  }

  await sendEmail(
    options.email,
    'contact@the-guild.dev',
    'contact@the-guild.dev',
    `Contact Us Form Submission - The Guild (${body.email})`,
    [`Name: ${body.name}`, `Email: ${body.email}`, `Notes: ${body.notes || ''}`].join('\n'),
    createMimeMessage().setSender(body.email),
  );

  let crispUser = await options.crisp.getCrispUser(body.email);

  if (!crispUser) {
    crispUser = await options.crisp.addNewCrispUser({
      email: body.email,
      person: {
        nickname: body.name,
      },
    });
  }

  await options.crisp.addCrispUserEvent(crispUser.people_id, {
    text: 'contact:website',
    data: {
      Details: `Contacted us through our website`,
    },
    color: 'grey',
  });

  return jsonResponse({ success: true }, 200, options.request.headers);
}
