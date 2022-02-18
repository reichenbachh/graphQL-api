import express, { Express } from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { loggerStream, logger } from "./config/winston";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";

async function listen(portNumber: number | string) {
  dotenv.config({ path: "../.env" });

  const app: Express = express();
  const httpServer: http.Server = http.createServer(app);
  app.use(helmet());
  app.use(morgan("combined", { stream: loggerStream }));
  app.use(cors());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app });

  return new Promise((resolve, reject) => {
    httpServer
      .listen(portNumber)
      .once("listening", resolve)
      .once("error", reject);
  });
}

(async function () {
  try {
    const PORT = process.env.PORT || 4000;
    const nodeEnv = process.env.NODE_ENV;
    await listen(PORT);
    logger.info(`Server is running on port ${PORT} in ${nodeEnv} mode`);
  } catch (error) {
    logger.warn(error);
  }
})();
