import { createServer } from "http";
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const app = express();
app.use(helmet());
app.use(morgan("combined"));

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
