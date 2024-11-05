const Category = require("../models/Category");

const categoryMutations = {
    createCategory: async (_, { name }) => {
      const newCategory = new Category({ name });
        return await newCategory.save();
    },
};

module.exports = categoryResolvers;
