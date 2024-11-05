const ratingTypeDefs = `#graphql
  type Rating {
    id: ID!
    userId: ID!
    recipeId: ID!
    value: Float!
    timestamp: Date!
  }

  extend type Query {
    ratingsForRecipe(recipeId: ID!): [Rating]
  }

  extend type Mutation {
    createRating(
      userId: ID!,
      recipeId: ID!,
      value: Float!,
      timestamp: Date!
    ): Rating
  }
`;

module.exports = ratingTypeDefs;
