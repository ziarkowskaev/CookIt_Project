// src/graphql/schema.js

const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");

// Importing Type Definitions
const userTypeDefs = require("./user/userTypeDefs");
const recipeTypeDefs = require("./recipe/recipeTypeDefs");
const categoryTypeDefs = require("./category/categoryTypeDefs");
const folderTypeDefs = require("./folder/folderTypeDefs");
const ratingTypeDefs = require("./rating/ratingTypeDefs");

// Importing Queries and Mutations
const userQueries = require("./user/userQueries");
const userMutations = require("./user/userMutations");
const recipeQueries = require("./recipe/recipeQueries");
const recipeMutations = require("./recipe/recipeMutations");
const categoryQueries = require("./category/categoryQueries");
const categoryMutations = require("./category/categoryMutations");
const folderQueries = require("./folder/folderQueries");
const folderMutations = require("./folder/folderMutations");
const ratingQueries = require("./rating/ratingQueries");
const ratingMutations = require("./rating/ratingMutations");

// Root Type Definitions
const rootTypeDefs = `#graphql
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`;

// Merging Type Definitions
const typeDefs = mergeTypeDefs([
  userTypeDefs,
  recipeTypeDefs,
  categoryTypeDefs,
  folderTypeDefs,
  ratingTypeDefs,
  rootTypeDefs,
]);

// Merging Resolvers
const resolvers = mergeResolvers([
  {
    Query: {
      ...userQueries,
      ...recipeQueries,
      ...categoryQueries,
      ...folderQueries,
      ...ratingQueries,
    },
  },
  {
    Mutation: {
      ...userMutations,
      ...recipeMutations,
      ...categoryMutations,
      ...folderMutations,
      ...ratingMutations,
    },
  },
]);

module.exports = { typeDefs, resolvers };
