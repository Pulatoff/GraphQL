const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = require("graphql");
const Person = require("./model/PersonModel");
const School = require("./model/SchoolSchema");

// const data = [
//   { id: 1, name: "Niyozbek", gender: "male", schoolId: 1 },
//   { id: 2, name: "Mahmud", gender: "male", schoolId: 2 },
//   { id: 3, name: "Bahora", gender: "female", schoolId: 3 },
//   { id: 4, name: "Sardor", gender: "male", schoolId: 2 },
//   { id: 5, name: "Jaloliddin", gender: "female", schoolId: 3 },
//   { id: 6, name: "Masariddin", gender: "male", schoolId: 1 },
//   { id: 7, name: "Mirzohid", gender: "female", schoolId: 1 },
// ];

// const schoolData = [
//   { id: 1, schoolName: "3-maktab", numberStudents: 345 },
//   { id: 2, schoolName: "2-maktab", numberStudents: 957 },
//   { id: 3, schoolName: "4-maktab", numberStudents: 1124 },
// ];

const PersonType = new GraphQLObjectType({
  name: "Person",
  fields: () => ({
    name: { type: GraphQLString },
    gender: { type: GraphQLString },
    school: {
      type: SchoolType,
      resolve: (parent, args) => {
        // return schoolData.find((school) => school.id == parent.id);
        return Person.findById({ school: parent.school });
      },
    },
  }),
});

const SchoolType = new GraphQLObjectType({
  name: "School",
  fields: () => ({
    _id: { type: GraphQLID },
    schoolName: { type: GraphQLString },
    numberStudents: { type: GraphQLInt },
    students: {
      type: new GraphQLList(PersonType),
      resolve: (parent, args) => {
        // return data.filter((person) => person.schoolId == parent.id);
        return Person.find({ students: parent._id });
      },
    },
  }),
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addPerson: {
      type: PersonType,
      args: {
        name: { type: GraphQLString },
        gender: { type: GraphQLString },
        school: { type: GraphQLID },
      },
      resolve: (parent, args) => {
        const person = new Person({
          name: args.name,
          gender: args.gender,
          school: args.school,
        });
        return person.save();
      },
    },
    addSchool: {
      type: SchoolType,
      args: {
        schoolName: { type: GraphQLString },
        numberStudents: { type: GraphQLInt },
      },
      resolve: async (parent, args) => {
        const school = new School({
          schoolName: args.schoolName,
          numberStudents: args.numberStudents,
        });
        return await school.save();
      },
    },
  },
});

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    person: {
      type: PersonType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        // return data.find((person) => person.id == args.id);
        return Person.findById(args._id);
      },
    },
    school: {
      type: SchoolType,
      args: { id: { type: GraphQLString } },
      resolve: (parent, args) => {
        // return schoolData.find((school) => school.id == args.id);
        return School.findById(args._id);
      },
    },
    schools: {
      type: new GraphQLList(SchoolType),
      resolve: (parent, args) => {
        // return schoolData;
        return School.find();
      },
    },
    students: {
      type: new GraphQLList(PersonType),
      resolve: (parent, args) => {
        // return data;
        return Person.find();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
