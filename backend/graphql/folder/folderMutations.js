const Folder = require("../../models/Folder");

const folderMutations = {
  // Create a new folder
  createFolder: async (_, { name }) => {
    const newFolder = new Folder({ name });
    return await newFolder.save();
  },
  deleteFolder: async (_, { id }) => {
    const deletedFolder = await Folder.findByIdAndDelete(id);
    if (!deletedFolder) {
      throw new Error("Folder not found");
    }
    return deletedFolder;
  },
  updateFolderName: async (_, { id, name }) => {
    const updatedFolder = await Folder.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    if (!updatedFolder) {
      throw new Error("Folder not found");
    }
    return updatedFolder;
  },

  removeRecipeFromFolder: async (_, { folderId, recipeId }) => {
    const updatedFolder = await Folder.findByIdAndUpdate(
      folderId,
      { $pull: { recipes: recipeId } },
      { new: true }
    );
    if (!updatedFolder) {
      throw new Error("Folder not found");
    }
    return updatedFolder;
  },

  addRecipeToFolder: async (_, { folderId, recipeId }) => {
    const updatedFolder = await Folder.findByIdAndUpdate(
      folderId,
      { $addToSet: { recipes: recipeId } },
      { new: true }
    );
    if (!updatedFolder) {
      throw new Error("Folder not found");
    }
    return updatedFolder;
  },
  addUserToFolder: async (_, { folderId, userId }) => {
    const updatedFolder = await Folder.findByIdAndUpdate(
      folderId,
      { $addToSet: { usersId: userId } }, 
      { new: true }
    );

    if (!updatedFolder) {
      throw new Error("Folder not found");
    }

    return updatedFolder;
  },
};

module.exports = folderMutations;
