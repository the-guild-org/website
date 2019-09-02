const { execute, parse } = require('graphql');
const { makeExecutableSchema } = require('graphql-tools');
const microCors = require('micro-cors');
const bugsnag = require('@bugsnag/js');

const { WebClient } = require('@slack/web-api');

const bugsnagClient = bugsnag(process.env.BUGSNAG_API);
const slack = new WebClient(process.env.SLACK_TOKEN);
const channelID = 'CLZ5BCE7K';
const cors = microCors({ allowMethods: ['POST'] });

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
    sayHi(
      email: String!
      project: Project!
      name: String
      message: String
    ): HiResponse!
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

      const result = await slack.chat.postMessage({
        channel: channelID,
        text: text.join(' '),
      });

      const meta = {
        author,
        message,
        email,
        project,
        projectMap,
        mappedProject,
      };

      if (!mappedProject) {
        throw new Error(`Failed to match the project ${JSON.stringify(meta)}`);
      }

      if (result.error) {
        console.error(result.error);

        throw new Error(
          `Slack failed to send a message ${JSON.stringify({
            ...meta,
            error: result.error,
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

module.exports = cors(async (req, res) => {
  const { query, variables } =
    typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

  const result = await execute({
    schema,
    document: parse(query),
    variableValues: variables,
  });

  if (result.errors && result.errors.length) {
    result.errors.forEach(error => {
      bugsnagClient.notify(error, {
        query,
        variables: JSON.stringify(variables),
      });
    });
  }

  res.json(result);
});
