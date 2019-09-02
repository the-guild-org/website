const { execute, parse } = require('graphql');
const { makeExecutableSchema } = require('graphql-tools');
const Sentry = require('@sentry/node');

const { WebClient } = require('@slack/web-api');

Sentry.init({ dsn: process.env.SENTRY_API });

const slack = new WebClient(process.env.SLACK_TOKEN);
const channelID = 'CLZ5BCE7K';

const typeDefs = /* GraphQL */ `
  type HiResponse {
    ok: Boolean!
  }

  type Query {
    ping: String!
  }

  enum Project {
    CONNECTED_BUILD
    GRAPHQL_CODE_GENERATOR
  }

  type Mutation {
    sayHi(email: String!, project: Project!): HiResponse!
  }
`;

const projectMap = {
  CONNECTED_BUILD: 'Connected Build',
  GRAPHQL_CODE_GENERATOR: 'GraphQL Code Generator',
};

const resolvers = {
  Query: {
    ping() {
      return 'pong';
    },
  },
  Mutation: {
    async sayHi(_, { email, project }) {
      console.log(process.env.SENTRY_API);
      const mappedProject = projectMap[project];
      const result = await slack.chat.postMessage({
        channel: channelID,
        text: `Someone from ${mappedProject} wants to get in touch \`${email}\``,
      });

      if (!mappedProject) {
        throw new Error(
          `Failed to match the project ${JSON.stringify({
            email,
            project,
            projectMap,
            mappedProject,
          })}`,
        );
      }

      if (result.error) {
        console.error(result.error);

        throw new Error(
          `Slack failed to send a message ${JSON.stringify({
            error: result.error,
            channelID,
            email,
          })}`,
        );
      }

      return {
        ok: result.ok,
      };
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = async (req, res) => {
  const { query, variables } =
    typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

  const result = await execute({
    schema,
    document: parse(query),
    variableValues: variables,
  });

  if (result.errors && result.errors.length) {
    result.errors.forEach(error => {
      Sentry.captureException(error);
    });
  }

  res.json(result);
};
