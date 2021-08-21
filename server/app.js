// MODULE:
const { ApolloServer } = require("apollo-server");
const { PubSub } = require("graphql-subscriptions");
const mongoose = require("mongoose");
const config = require("config");

const pubsub = new PubSub();
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/index");
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

const dbUrl = config.get("dbConfig.url");
mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.info("Database Ready !");
    return server.listen({ port: 5432 });
  })
  .then(({ url }) => {
    console.info("Server Ready at " + url);
  });
