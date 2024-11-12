const Recipe = require("../../models/Recipe");

const recipeQueries = {
  allRecipes: async () => {
    return Recipe.find({}).populate("ratings");
  },
  recipe: async (root, args) => {
    return Recipe.findById(args.id).populate("ratings");
  },
};

module.exports = recipeQueries;
