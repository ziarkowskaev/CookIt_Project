const recipeTypeDefs = `#graphql
  scalar Date

  type Recipe {
    name: String!
    description: String!
    ingredients: [String]!
    preparation: String!
    images: [String]
    tags: [String]!
    ratings: [Rating]
    createdBy: ID!
    createdOn: Date!
    id: ID!
  }

  extend type Query {
    allRecipes: [Recipe]
    recipe(id: ID!): Recipe
  }

  extend type Mutation {
    createRecipe(
      name: String!
      description: String!
      ingredients: [String]
      preparation: String
      images: [String]
      tags: [String]
      createdBy: ID!
    ): Recipe

    deleteRecipe(
        id: ID!
    ): Recipe
  }
`;

module.exports = recipeTypeDefs;
