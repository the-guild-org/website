const { execute, parse } = require('graphql');
const { makeExecutableSchema } = require('graphql-tools');

const { WebClient } = require('@slack/web-api');

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

      if (result.error) {
        console.error(result.error);
        throw new Error(`Slack failed to send a message`);
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
  const { query, variables } = JSON.parse(req.body);

  const result = await execute({
    schema,
    document: parse(query),
    variableValues: variables,
  });

  res.json(result);
};
