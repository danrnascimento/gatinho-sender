const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const { GraphQLUpload, graphqlUploadExpress } = require("graphql-upload");

const typeDefs = gql`
  # The implementation for this scalar is provided by the
  # 'GraphQLUpload' export from the 'graphql-upload' package
  # in the resolver map below.
  scalar Upload

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type Query {
    working: Boolean!
  }

  type Mutation {
    # Multiple uploads are supported. See graphql-upload docs for details.
    singleUpload(file: Upload!, nsfw: Boolean!): Boolean!
    saveUrl(url: String!, nsfw: Boolean!): Boolean!
  }
`;

const resolvers = {
  // This maps the `Upload` scalar to the implementation provided
  // by the `graphql-upload` package.
  Upload: GraphQLUpload,

  Mutation: {
    singleUpload: async (parent, { file }) => {
      const { createReadStream } = await file;

      // Invoking the `createReadStream` will return a Readable Stream.
      // See https://nodejs.org/api/stream.html#stream_readable_streams
      const stream = createReadStream();

      // This is purely for demonstration purposes and will overwrite the
      // local-file-output.txt in the current working directory on EACH upload.
      const out = require("fs").createWriteStream("local-file-output.txt");
      stream.pipe(out);

      return true;
    },
    saveUrl: async (parent, { url }) => {
      return Boolean(url);
    },
  },
};

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  const app = express();

  // This middleware should be added before calling `applyMiddleware`.
  app.use(graphqlUploadExpress());

  server.applyMiddleware({ app });

  await new Promise((resolve) => app.listen({ port: 4444 }, resolve));

  console.log(`🚀 Server ready at http://localhost:4444${server.graphqlPath}`);
}

startServer();
