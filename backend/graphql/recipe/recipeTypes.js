const recipeTypeDefs = `#graphql
  type Recipe {
    name: String!
    description: String!
    ingredients: String!
    preparation: String!
    images: [String!]
    tags: String!
    ratings: String!
    createdBy: ID!
    createdOn: Date!
    id: ID!
  }

  extend type Query {
    allRecipes: [Recipe]
    recipe: Recipe
  }

  extend type Mutation {
    createRecipe(
      name: String!,
      description: String!,
      ingredients: String!,
      preparation: String!,
      images: [String!],
      tags: String!,
      ratings: String!,
      createdBy: ID!,
    ): Recipe
    deleteRecipe(
        id: ID!
    )
  }
`;

module.exports = userTypeDefs;
