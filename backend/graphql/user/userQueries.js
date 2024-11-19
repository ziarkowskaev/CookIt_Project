const User = require("../../models/User");

const userQueries = {
  me: (root, args, context) => {
    return context.currentUser;
  },
};

module.exports = userQueries;
