const { GraphQLError } = require("graphql");
const authService = require("../../services/auth");
const bcrypt = require("bcrypt");
const User = require("../../models/User");

const userMutations = {
  createUser: async (root, { username, password, email }) => {

    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    const user = new User({
      username: username,
      passwordHash: passwordHash,
      email: email
    })
    console.log(user)

    return user.save().catch((error) => {
      throw new GraphQLError("Creating the user failed", {
        extensions: {
          code: "BAD_USER_INPUT",
          invalidArgs: username,
          error,
        },
      });
    });
  },
  login: async (root, args, { res }) => authService.login(args, res),
};

module.exports = userMutations;
