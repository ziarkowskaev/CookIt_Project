const Rating = require("../../models/Rating");

const ratingMutations = {
  createRating: async (_, { userId, recipeId, value }) => {
    if (value < 1 || value > 5) {
      throw new Error("Rating value must be between 1 and 5");
    }

    const newRating = new Rating({
      userId,
      recipeId,
      value,
      timestamp: new Date(), // Set timestamp to the current date
    });
    return newRating.save();
  },
};

module.exports = ratingMutations;
