const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
} = require("graphql");

const data = [
  { id: 1, name: "Niyozbek", gender: "male", schoolId: 1 },
  { id: 2, name: "Mahmud", gender: "male", schoolId: 2 },
  { id: 3, name: "Bahora", gender: "female", schoolId: 3 },
];

const schoolData = [
  { id: 1, schoolName: "3-maktab", numberStudents: 345 },
  { id: 2, schoolName: "2-maktab", numberStudents: 957 },
  { id: 3, schoolName: "4-maktab", numberStudents: 1124 },
];

const PersonType = new GraphQLObjectType({
  name: "Person",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    gender: { type: GraphQLString },
    school: {
      type: SchoolType,
      resolve: (parent, args) => {
        return schoolData.find((school) => school.id == parent.id);
      },
    },
  }),
});

const SchoolType = new GraphQLObjectType({
  name: "School",
  fields: () => ({
    id: { type: GraphQLID },
    schoolName: { type: GraphQLString },
    numberStudents: { type: GraphQLInt },
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
    school: {
      type: SchoolType,
      args: { id: { type: GraphQLString } },
      resolve: (parent, args) => {
        return schoolData.find((school) => school.id == args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
});
