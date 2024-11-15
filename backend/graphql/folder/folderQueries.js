const Folder = require("../../models/Folder");

const folderQueries = {
  foldersByUser: async (_, { userId }) => {
    return Folder.find({ usersId: userId }).populate("recipes");
  },
  folder: async (_, { id }) => {
    return Folder.findById(id).populate("recipes");
  },
};

module.exports = folderQueries;
