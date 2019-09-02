const { execute, parse } = require('graphql');
const { makeExecutableSchema } = require('graphql-tools');
const bugsnag = require('@bugsnag/js');

const { WebClient } = require('@slack/web-api');

const bugsnagClient = bugsnag(process.env.BUGSNAG_API);
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
      const result = await slack.chat.postMessage({
        channel: channelID,
        text: `Someone from ${projectMap[project]} wants to get in touch \`${email}\``,
      });

      if (!projectMap[project]) {
        bugsnagClient.leaveBreadcrumb('Could not match the project', {
          channelID,
          email,
          project,
          projectMap,
          mappedProject: projectMap[project],
        });
      }

      if (result.error) {
        console.error(result.error);

        bugsnagClient.notify(result.error, {
          metaData: {
            channelID,
            email,
            project,
            mappedProject: projectMap[project],
            result,
          },
        });

        throw new Error(`Slack failed to send a message`);
      }

      bugsnagClient.leaveBreadcrumb('Someone says hi', {
        email,
        project,
        mappedProject: projectMap[project],
      });

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
  const { query, variables } = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

  const result = await execute({
    schema,
    document: parse(query),
    variableValues: variables,
  });

  if (result.errors && result.errors.length) {
    result.errors.forEach(error => {
      bugsnagClient.notify(error, {
        metaData: {
          query,
          variables,
        },
      });
    });
  }

  res.json(result);
};
