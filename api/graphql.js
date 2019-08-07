const {
  execute,
  parse,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull,
} = require('graphql');
const { WebClient } = require('@slack/web-api');

const slack = new WebClient(process.env.SLACK_TOKEN);
const channelID = 'CLZ5BCE7K';

const HiResponse = new GraphQLObjectType({
  name: 'HiResponse',
  fields: {
    ok: {
      type: GraphQLBoolean,
    },
  },
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    ping: {
      type: GraphQLString,
      resolve() {
        return 'pong';
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    sayHi: {
      type: HiResponse,
      args: {
        email: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      async resolve(_, { email }) {
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
  },
});

const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
  types: [HiResponse],
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
