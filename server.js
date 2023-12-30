import { ApolloServer, gql } from "apollo-server";

//package.json에서 type:"module"로 해야 위에처럼 import로 가능하고, 아니면 아래처럼 require 써야함
// const {ApolloServer, gql} = require("apollo-server")

let tweets = [
  {
    id: "1",
    text: "first one",
    userId: "2",
  },
  {
    id: "2",
    text: "second one",
    userId: "1",
  },
];

let users = [
  { id: "1", firstName: "nico", lastName: "las" },
  { id: "2", firstName: "Elon", lastName: "Musk" },
];

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    """
    Is the sum of firstName + lastName as String
    """
    fullName: String!
  }
  """
  Tweet object represents a resource for a Tweet
  """
  type Tweet {
    id: ID!
    text: String!
    author: User
  }
  # Query : Rest_API에서 Get 기능
  type Query {
    allUsers: [User!]!
    allTweets: [Tweet!]!
    tweet(id: ID!): Tweet
  }
  # Mutation : Rest_API에서 POST, PUT, DELETE 기능
  # mutation {} 이런식으로 쿼리 쓸 때 mutation 붙여야함
  type Mutation {
    postTweet(text: String!, userId: ID!): Tweet!
    """
    Deletes a Tweet if found, else return false
    """
    deleteTweet(id: ID!): Boolean!
  }
`;

const resolvers = {
  Query: {
    allTweets() {
      console.log("allTweets called")
      return tweets;
    },
    tweet(root, { id }) {
      return tweets.find((tweet) => tweet.id === id);
    },
    allUsers() {
      // console.log("all user called");
      return users;
    },
  },
  Mutation: {
    postTweet(root, { text, userId }) {
      const user = users.find(user => user.id == userId)
      if (!user){
        return
      }
      const newTweet = {
        id: tweets.length + 1,
        text: text,
        // text
        userId
      };
      tweets.push(newTweet);
      return newTweet;
    },
    deleteTweet(root, { id }) {
      const tweet = tweets.find((tweet) => tweet.id === id);
      if (!tweet) return false;
      tweets = tweets.filter((tweet) => tweet.id !== id);
      return true;
    },
  },
  User: {
    fullName({ firstName, lastName }) {
      // console.log("full name called");
      return `${firstName} ${lastName}`;
    },
  },
  Tweet : {
    author({userId}){
      console.log("author called")
      return users.find((user)=>user.id === userId)
    }
  }
};
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
