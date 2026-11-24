import { createMimeMessage } from 'mimetext';
import { CrispClient } from './crisp-client';
import { sendEmail } from './email';
import { jsonResponse } from './http';
import { verifyTurnstileToken } from './turnstile';

export async function handleContactUs(options: {
  email: SendEmail;
  request: Request;
  body: unknown;
  crisp: CrispClient;
  turnstileSecret: string;
}) {
  const body = options.body as {
    email?: unknown;
    name?: unknown;
    notes?: unknown;
    turnstileToken?: unknown;
  } | null;

  const email = typeof body?.email === 'string' ? body.email.trim() : '';
  const name = typeof body?.name === 'string' ? body.name.trim() : '';
  const notes = typeof body?.notes === 'string' ? body.notes : '';
  const turnstileToken = typeof body?.turnstileToken === 'string' ? body.turnstileToken : '';

  if (!email || !name) {
    return jsonResponse({ error: 'Name and email are required' }, 400, options.request.headers);
  }

  // A missing secret throws (and reaches Sentry) rather than silently letting
  // every submission through.
  if (!options.turnstileSecret) {
    throw new Error('TURNSTILE_SECRET_KEY is not configured');
  }

  const human =
    !!turnstileToken &&
    (await verifyTurnstileToken({
      secret: options.turnstileSecret,
      token: turnstileToken,
      remoteIp: options.request.headers.get('CF-Connecting-IP'),
    }));

  if (!human) {
    return jsonResponse({ error: 'Captcha verification failed' }, 403, options.request.headers);
  }

  await sendEmail(
    options.email,
    'contact@the-guild.dev',
    'contact@the-guild.dev',
    `Contact Us Form Submission - The Guild (${email})`,
    [`Name: ${name}`, `Email: ${email}`, `Notes: ${notes}`].join('\n'),
    createMimeMessage().setSender(email),
  );

  let crispUser = await options.crisp.getCrispUser(email);

  if (!crispUser) {
    crispUser = await options.crisp.addNewCrispUser({
      email,
      person: {
        nickname: name,
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
