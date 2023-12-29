import { ApolloServer, gql } from "apollo-server";

//package.json에서 type:"module"로 해야 위에처럼 import로 가능하고, 아니면 아래처럼 require 써야함
// const {ApolloServer, gql} = require("apollo-server")
const typeDefs = gql`
  type User {
    id: ID
    username: String
  }
  type Tweet {
    id: ID
    text: String
    author: User
  }
  # Query : Rest_API에서 Get 기능
  type Query {
    allTweets: [Tweet]
    tweet(id: ID): Tweet
  }
  # Mutation : Rest_API에서 POST, PUT, DELETE 기능
  # mutation {} 이런식으로 쿼리 쓸 때 mutation 붙여야함
  type Mutation {
    postTweet(text: String, userId: ID): Tweet
    deleteTweet(id:ID): Boolean
  }
`;

const server = new ApolloServer({ typeDefs });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
