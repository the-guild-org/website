const microCors = require('micro-cors');
const bugsnag = require('@bugsnag/js');
const crypto = require('crypto');
const axios = require('axios').default;

const { WebClient } = require('@slack/web-api');

const bugsnagClient = bugsnag(process.env.BUGSNAG_API);
const slack = new WebClient(process.env.SLACK_TOKEN);
const zapier = process.env.ZAPIER_INSPECTOR_WEBHOOK;
const channelID = 'CLZ5BCE7K';
const cors = microCors();

function isAllowed(req) {
  console.error(req.headers);

  const signature = (req.headers['x-hub-signature'] || '').replace('sha1=', '');

  console.log('Received signature:', signature);

  const ourSignature = crypto
    .createHmac('sha1', process.env.MARKETPLACE_INSPECTOR_SECRET)
    .update(typeof req.body === 'string' ? req.body : JSON.stringify(req.body))
    .digest('hex');

  console.log('Our signature:', ourSignature);
  console.log('Both equal:', ourSignature === signature);

  return ourSignature === signature;
}

module.exports = cors(async (req, res) => {
  if (!isAllowed(req)) {
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

  const payload =
    typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  const { action, sender, marketplace_purchase } = payload;

  bugsnagClient.metaData = payload;

  let login;
  let email;
  let url = sender.url;
  let isOrg = false;

  if (
    marketplace_purchase &&
    marketplace_purchase.account &&
    marketplace_purchase.account.type === 'Organization'
  ) {
    login = marketplace_purchase.account.login;
    email = marketplace_purchase.account.organization_billing_email;
    isOrg = true;
  } else {
    login = sender.login;
    email = sender.email;
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
          bugsnagClient.metaData = {
            ...bugsnagClient.metaData,
            slack: result,
          };
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
  ]);

  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.end();
});
