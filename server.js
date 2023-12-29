import { ApolloServer, gql } from "apollo-server";

//package.json에서 type:"module"로 해야 위에처럼 import로 가능하고, 아니면 아래처럼 require 써야함
// const {ApolloServer, gql} = require("apollo-server")
const typeDefs = gql`
  type Query {
    text: String
    hello: String
  }
`;

const server = new ApolloServer({ typeDefs });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
