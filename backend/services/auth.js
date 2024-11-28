const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const login = async ({ username, password }) => {
  const user = await User.findOne({ username });
  const validPassword = await bcrypt.compare(password, user.passwordHash)

  if (!user || !validPassword) {
    throw new GraphQLError("wrong credentials", {
      extensions: { code: "BAD_USER_INPUT" },
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  return { value: jwt.sign(userForToken, process.env.JWT_SECRET), user: userForToken };
};

module.exports = { login };
