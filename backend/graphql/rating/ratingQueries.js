const Rating = require("../../models/Rating");

const ratingQueries = {
  ratingsForRecipe: async (_, { recipeId }) => {
    return Rating.find({ recipeId }).populate("userId");
  },
};

module.exports = ratingQueries;
