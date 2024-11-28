const userTypeDefs = `#graphql
  type User {
    username: String!
    id: ID!
  }

  type Token {
    value: String!
    user: User!
  }

  extend type Query {
    me: User
    allUsers: [User]
    getUser(id: ID!): User
  }

  extend type Mutation {
    createUser(username: String!, password:String!, email: String!): User
    login(username: String!, password: String!): Token
  }
`;

module.exports = userTypeDefs;
