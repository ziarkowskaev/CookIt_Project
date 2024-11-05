const Folder = require("../../models/Folder");

const folderMutations = {
  // Create a new folder
  createFolder: async (_, { name, userId }) => {
    const newFolder = new Folder({ name, userId });
    return await newFolder.save();
  },
};

module.exports = folderMutations;
