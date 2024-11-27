const mongoose = require("mongoose");
const Folder = require("../../models/Folder");

const folderMutations = {
  // Create a new folder
  createFolder: async (_, { name, userId }) => {

    const newFolder = new Folder({
      name,
      users: [userId], 
    });

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

  addUsersToFolder: async (_, { folderId, usersId }) => {
    // Validate that userIds is an array
    if (!Array.isArray(usersId)) {
        throw new Error("userIds must be an array");
    }

    const updatedFolder = await Folder.findByIdAndUpdate(
        folderId,
        { $addToSet: { users: { $each: usersId } } }, 
        { new: true } 
    );

    if (!updatedFolder) {
        throw new Error("Folder not found");
    }

    return updatedFolder;
},
};

module.exports = folderMutations;
