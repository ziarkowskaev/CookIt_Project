const User = require("../../models/User");

const userQueries = {
  me: (root, args, context) => {
    return context.currentUser;
  },
  allUsers: async () => {
    return User.find({}).populate("createdRecipes");
  },
  getUser: async (_, { id }) => {
    return User.findById(id).populate("createdRecipes");
  },
};

module.exports = userQueries;
