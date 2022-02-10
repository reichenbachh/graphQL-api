import { createServer } from "http";
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
