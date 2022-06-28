const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
} = require("graphql");

const data = [
  { id: "1", name: "Niyozbek", gender: "male" },
  { id: "2", name: "Mahmud", gender: "male" },
  { id: "3", name: "Bahora", gender: "female" },
];

const PersonType = new GraphQLObjectType({
  name: "Person",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    gender: { type: GraphQLString },
  }),
});

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    person: {
      type: PersonType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return data.find((person) => person.id == args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
});
