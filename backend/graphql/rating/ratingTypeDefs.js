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
      timestamp: Date
    ): Rating
    deleteRating(id: ID!):Rating
    updateRating(id: ID!, value: Float!):Rating
  }
`;

module.exports = ratingTypeDefs;
