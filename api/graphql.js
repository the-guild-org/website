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

  type Mutation {
    sayHi(email: String!): HiResponse!
  }
`;

const resolvers = {
  Query: {
    ping() {
      return 'pong';
    },
  },
  Mutation: {
    async sayHi(_, { email }) {
      const result = await slack.chat.postMessage({
        channel: channelID,
        text: `Someone from Connected Build wants to get in touch \`${email}\``,
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
