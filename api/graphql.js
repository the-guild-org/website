const {
  execute,
  parse,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull,
} = require('graphql');

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
      resolve(_, { email }) {
        console.log('Received an email', email);

        return {
          ok: true,
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
