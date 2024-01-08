import { EmailMessage } from 'cloudflare:email';
import { createMimeMessage, Mailbox } from 'mimetext';

export async function sendEmail(
  engine: SendEmail,
  from: string,
  to: string,
  title: string,
  body: string,
  replyTo?: Mailbox,
) {
  const msg = createMimeMessage();
  msg.setSender({ name: 'Guild Contact Bot', addr: from });
  msg.setRecipient(to);
  msg.setSubject(title);
  msg.addMessage({
    contentType: 'text/plain',
    data: body,
  });

  if (replyTo) {
    msg.setHeader('Reply-To', replyTo);
  }

  const message = new EmailMessage(from, to, msg.asRaw());

  return await engine.send(message);
}
