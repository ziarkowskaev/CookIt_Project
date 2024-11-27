const Folder = require("../../models/Folder");

const folderQueries = {
  foldersByUser: async (_, { userId }) => {
    return Folder.find({ users: userId }).populate("recipes").populate("users");
  },
  folder: async (_, { id }) => {
    return Folder.findById(id).populate("recipes").populate("users");
  },
};

module.exports = folderQueries;
