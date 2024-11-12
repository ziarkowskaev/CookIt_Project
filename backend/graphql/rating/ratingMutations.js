const Rating = require("../../models/Rating");
const Recipe = require("../../models/Recipe");

const ratingMutations = {
  createRating: async (_, { userId, recipeId, value }) => {
    if (value < 1 || value > 5) {
      throw new Error("Rating value must be between 1 and 5");
    }

    if (!Recipe.findById(recipeId)) {
      throw new Error("Recipe not found");
    }

    const newRating = new Rating({
      userId,
      recipeId,
      value,
      timestamp: new Date(), 
    });

    const savedRating = await newRating.save();

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      recipeId,
      { $addToSet: { ratings: savedRating._id } },
      { new: true }
    );

    if (!updatedRecipe) {
      throw new Error("Recipe not found");
    }

    return savedRating;
  },
  deleteRating: async (_, { id }) => {
    const deletedRating = await Rating.findByIdAndDelete(id);
    if (!deletedRating) {
      throw new Error("Rating not found");
    }
    return deletedRating;
  },
  updateRating: async (_, { id, value }) => {
    const updatedRating = await Rating.findByIdAndUpdate(
      id,
      { value },
      { new: true }
    );
    if (!updatedRating) {
      throw new Error("Rating not found");
    }
    return updatedRating;
  },

};

module.exports = ratingMutations;
