const { GraphQLObjectType, GraphQLString, GraphQLSchema } = require("graphql");

const PersonType = new GraphQLObjectType({
  name: "Person",
  fields: () => ({
    name: { type: GraphQLString },
    bestFriend: { type: GraphQLString },
  }),
});

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    movie: {
      type: PersonType,
      args: { name: { type: GraphQLString } },
      resolve: (parent, args) => {},
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
});
