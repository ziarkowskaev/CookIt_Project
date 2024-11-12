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
      timestamp: new Date(), 
    });
    return newRating.save();
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
