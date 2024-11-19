const Category = require("../../models/Category");

const categoryMutations = {
  createCategory: async (_, { name }) => {
    const newCategory = new Category({ name });
    return await newCategory.save();
  },
  deleteCategory: async (_, { id }) => {
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      throw new Error("Category not found");
    }
    return deletedCategory;
  },
  updateCategory: async (_, { id, name }) => {
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    if (!updatedCategory) {
      throw new Error("Category not found");
    }
    return updatedCategory;
  },

};

module.exports = categoryMutations;
