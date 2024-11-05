const Category = require("../../models/Category");

const categoryQueries = {
  allCategories: async () => {
    try {
      return await Category.find({}).populate("recipes");
    } catch (error) {
      throw new Error("Error fetching categories");
    }
  },

  // Fetch a specific category by ID
  category: async (_, { id }) => {
    try {
      return await Category.findById(id).populate("recipes");
    } catch (error) {
      throw new Error("Category not found");
    }
  },
};

module.exports = categoryQueries;
