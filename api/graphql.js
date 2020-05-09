const { execute, parse } = require('graphql');
const { makeExecutableSchema } = require('graphql-tools');
const microCors = require('micro-cors');
const bugsnag = require('@bugsnag/js');
const axios = require('axios').default;

const { WebClient } = require('@slack/web-api');

const bugsnagClient = bugsnag(process.env.BUGSNAG_API);
const slack = new WebClient(process.env.SLACK_TOKEN);
const channelID = 'CLZ5BCE7K';
const cors = microCors();

const typeDefs = /* GraphQL */ `
  type HiResponse {
    ok: Boolean!
  }

  type Query {
    ping: String!
  }

  type Mutation {
    sayHi(
      email: String!
      project: String!
      name: String
      message: String
    ): HiResponse!
    subscribe(email: String!): HiResponse!
  }
`;

const projectMap = {
  CONNECTED_BUILD: 'Connected Build',
  WEBSITE: 'Website',
  GRAPHQL_CODE_GENERATOR: 'GraphQL Code Generator',
  GRAPHQL_INSPECTOR: 'GraphQL Inspector',
};

const resolvers = {
  Query: {
    ping() {
      return 'pong';
    },
  },
  Mutation: {
    async sayHi(_, { email, project, name, message }) {
      const mappedProject = projectMap[project];
      const author = name || 'Someone';

      const text = [
        author,
        `from ${mappedProject} wants to get in touch \`${email}\``,
      ];

      if (message) {
        text.push('\n');
        text.push(`> ${message}`);
      }

      bugsnagClient.metaData = {
        ...bugsnagClient.metaData,
        author,
        message,
        email,
        project,
        projectMap,
        mappedProject,
      };

      const result = await slack.chat.postMessage({
        channel: channelID,
        text: text.join(' '),
      });

      if (!mappedProject) {
        throw new Error(`Failed to match the project ${project}`);
      }

      if (result.error) {
        console.error(result.error);

        bugsnagClient.metaData = {
          ...bugsnagClient.metaData,
          slack: result,
        };

        throw new Error(`Slack failed to send a message`);
      }

      return {
        ok: result.ok,
      };
    },
    async subscribe(_, { email }) {
      const listId = '6da08f478f';
      const dc = 'us8';
      const result = await axios.post(
        `https://${dc}.api.mailchimp.com/3.0/lists/${listId}/members`,
        {
          email_address: email,
          status: 'subscribed',
          tags: ['website'],
        },
        {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            authorization:
              'Basic ' +
              new Buffer('any:' + process.env.MAILCHIMP_API_KEY).toString(
                'base64'
              ),
          },
        }
      );

      if (!result.data || !result.data.id) {
        throw new Error(`Failed to subscribe ${email}`);
      }

      return {
        ok: true,
      };
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

function isAllowed(req) {
  console.error(req.headers);

  return [
    'https://graphql-code-generator.com',
    'https://the-guild.dev',
    'https://graphql-inspector.com',
    'https://the-guild-website-kamilkisiela.theguild.now.sh',
    'https://the-guild-website-git-feat-new.theguild.now.sh',
  ].includes(req.headers.origin);
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

  const { query, variables } =
    typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

  bugsnagClient.metaData = {
    query,
    variables: JSON.stringify(variables),
  };

  const result = await execute({
    schema,
    document: parse(query),
    variableValues: variables,
  });

  if (result.errors && result.errors.length) {
    result.errors.forEach((error) => {
      bugsnagClient.notify(error);
    });
  }

  res.json(result);
});
