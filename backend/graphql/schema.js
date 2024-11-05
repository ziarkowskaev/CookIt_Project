const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
const userTypeDefs = require("./user/userTypes");
const userQueries = require("./user/userQueries");
const userMutations = require("./user/userMutations");

const rootTypeDefs = `#graphql
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`;

const typeDefs = mergeTypeDefs([userTypeDefs, rootTypeDefs]);
const resolvers = mergeResolvers([
  { Query: { ...userQueries } },
  { Mutation: { ...userMutations } },
]);

module.exports = { typeDefs, resolvers };
