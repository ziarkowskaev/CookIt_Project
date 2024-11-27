const User = require("../../models/User");

const userQueries = {
  me: (root, args, context) => {
    return context.currentUser;
  },
  allUsers: async () => {
    return User.find({}).populate("createdRecipes");
  },
};

module.exports = userQueries;
