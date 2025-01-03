const Recipe = require("../../models/Recipe");
const { GraphQLError } = require("graphql");
const User = require("../../models/User");

const recipeMutations = {
  createRecipe: async (root, args) => {
    
    const recipe = new Recipe({
      ...args,
      createdOn: new Date(),
    });

    const updatedUser = await User.findByIdAndUpdate(
      recipe.createdBy,
      { $addToSet: { createdRecipes: recipe._id } },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return recipe.save();
  },

  //delete Ratings when recipe is removed
  deleteRecipe: async (root, args) => {
    const recipe = await Recipe.findByIdAndRemove(args.id);
    if (!recipe) {
      throw new GraphQLError("Recipe not found", {
        extensions: { code: "NOT_FOUND" },
      });
    }
    return recipe;
  },
};

module.exports = recipeMutations;
