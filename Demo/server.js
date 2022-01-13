const express = require("express");
const expressGraphQL = require("express-graphql").graphqlHTTP;
const {
  GraphQLSchema,
  GraphQLObjectType,
  //   Upto here
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");

const app = express();

const actors = [
  { id: 1, name: "Benedict" },
  { id: 2, name: "Rajnikanth" },
  { id: 3, name: "Leonardo" },
  { id: 4, name: "Johnny" },
];

const films = [
  { id: 1, name: "Endgame", actorId: 1, imdbRating: 1 },
  { id: 2, name: "Dr Strange", actorId: 1, imdbRating: 2 },
  { id: 3, name: "Darbar", actorId: 2, imdbRating: 3 },
  { id: 4, name: "Chitti Robo", actorId: 2, imdbRating: 4 },
  { id: 5, name: "Inception", actorId: 3, imdbRating: 5 },
  { id: 6, name: "Shutter Island", actorId: 3, imdbRating: 1 },
  { id: 7, name: "Dont look up", actorId: 3, imdbRating: 2 },
  { id: 8, name: "Pirates of the Caribbean", actorId: 4, imdbRating: 3 },
  { id: 9, name: "Minamata", actorId: 4, imdbRating: 4 },
];

// Step 3
// const schema = new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: "HelloWorld",
//     fields: () => ({
//       message: {
//         type: GraphQLString,
//         resolve: () => "Hello World",
//       },
//     }),
//   }),
// });

// Step 4
const FilmType = new GraphQLObjectType({
  name: "Film",
  description: "film object description",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    actorId: { type: GraphQLNonNull(GraphQLInt) },

    // Step 5
    actor: {
      type: ActorType,
      resolve: film => {
        return actors.find(actor => actor.id === film.actorId);
      },
    },
  }),
});

const ActorType = new GraphQLObjectType({
  name: "Actor",
  description: "Actor object description",
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query object description",
  fields: () => ({
    films: {
      type: new GraphQLList(FilmType),
      description: "List of All Films",
      resolve: () => films,
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
});

// Step 2
app.use(
  "/graphql",
  expressGraphQL({
    schema: schema,
    graphiql: true,
  })
);
app.listen(5000, () => console.log("Listening to port 5000"));
