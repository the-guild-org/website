import crypto from 'node:crypto';
import { NextApiRequest, NextApiResponse } from 'next';

import Bugsnag from '@bugsnag/js';
import axios from 'axios';
import { WebClient } from '@slack/web-api';
import { ensureContact } from '../../lib/contacts';
import { getRawBody } from '../../lib/getRawBody';

export const config = {
  api: {
    bodyParser: false,
  },
};

const bugsnagClient = Bugsnag.createClient(process.env.BUGSNAG_API);
const slack = new WebClient(process.env.SLACK_TOKEN);
const zapier = process.env.ZAPIER_INSPECTOR_WEBHOOK;
const channelID = 'CLZ5BCE7K';

function isAllowed(req: NextApiRequest, body: string) {
  const signature = ((req.headers['x-hub-signature'] as string) || '').replace(
    'sha1=',
    ''
  );

  console.log('Received signature:', signature);

  const ourSignature = crypto
    .createHmac('sha1', process.env.MARKETPLACE_INSPECTOR_SECRET)
    .update(typeof body === 'string' ? body : JSON.stringify(body))
    .digest('hex');

  console.log('Our signature:', ourSignature);
  console.log('Both equal:', ourSignature === signature);

  return ourSignature === signature;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const rawBody = await getRawBody(req);
  const body = rawBody.toString();
  if (!isAllowed(req, body)) {
    res.statusCode = 500;
    res.statusMessage = 'Not Allowed by CORS';
    res.end();
    return;
  }

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.statusMessage = 'OK';
    res.end();
    return;
  }

  const payload = typeof body === 'string' ? JSON.parse(body) : body;
  const { action, sender, marketplace_purchase } = payload;

  bugsnagClient.addMetadata('payload', payload);

  let { login, email } = sender;
  const url = sender.html_url;
  let isOrg = false;

  if (
    marketplace_purchase &&
    marketplace_purchase.account &&
    marketplace_purchase.account.type === 'Organization'
  ) {
    // eslint-disable-next-line prefer-destructuring
    login = marketplace_purchase.account.login;
    email = marketplace_purchase.account.organization_billing_email;
    isOrg = true;
  }

  await Promise.all([
    slack.chat
      .postMessage({
        channel: channelID,
        text: [
          '*Inspector App*',
          `_Action:_ ${action}`,
          `_Is organization:_ ${isOrg ? 'yes' : 'no'}`,
          `_Login:_ ${login}`,
          `_Email:_ ${email}`,
          `_Url:_ ${url}`,
        ].join('\n'),
      })
      .then((result) => {
        if (result.error) {
          console.error(result.error);
          bugsnagClient.addMetadata('slack', {
            result,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        bugsnagClient.notify(error);
      }),
    axios.post(zapier, payload).catch((error) => {
      console.error(error);
      bugsnagClient.notify(error);
    }),
    ensureContact({
      name: login,
      email,
      url,
      segments: ['inspector', 'inspector-app', isOrg ? 'org' : null].filter(
        Boolean
      ),
    }).catch((error) => {
      console.error(error);
      bugsnagClient.notify(error);
    }),
  ]);

  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.end();
};
