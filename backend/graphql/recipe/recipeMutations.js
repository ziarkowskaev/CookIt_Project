const Recipe = require("../../models/Recipe");
const { GraphQLError } = require("graphql");

const recipeMutations = {
  createRecipe: async (root, args) => {
    const recipe = new Recipe({
      ...args,
      createdOn: new Date(),
    });
    return recipe.save();
  },
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
