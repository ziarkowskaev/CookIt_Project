const Recipe = require("../../models/Recipe");

const recipeQueries = {
  allRecipes: async () => {
    return Recipe.find({});
  },
  recipe: async (root, args) => {
    return Recipe.findById(args.id);
  },
};

module.exports = recipeQueries;
