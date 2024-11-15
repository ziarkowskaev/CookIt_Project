const { GraphQLError } = require("graphql");
const authService = require("../../services/auth");
const User = require("../../models/User");

const userMutations = {
  createUser: async (root, args) => {
    const user = new User({
      username: args.username,
      favoriteGenre: args.favoriteGenre,
    });

    return user.save().catch((error) => {
      throw new GraphQLError("Creating the user failed", {
        extensions: {
          code: "BAD_USER_INPUT",
          invalidArgs: args.username,
          error,
        },
      });
    });
  },
  login: async (root, args) => authService.login(args),
};

module.exports = userMutations;
