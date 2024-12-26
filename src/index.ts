import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PrismaClient } from "@prisma/client";
import { resolvers } from "./gql/resolvers/resolver";
import { typeDefs } from "./gql/schemas";
import { JwtHelper } from "./helper/jwt";
import { IContext } from "./types/common";
export const prisma = new PrismaClient();

const main = async () => {
  // The ApolloServer constructor requires two parameters: your schema
  // definition and your set of resolvers.
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }): Promise<IContext> => {
      const decodeToken = await JwtHelper.jwtVerify(
        req.headers.authorization as string
      );
      return {
        prisma,
        decodeToken,
      };
    },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

main();
