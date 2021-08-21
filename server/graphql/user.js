//         MODULE:
const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const config = require("config");
const { UserInputError, AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");

//         FILES:
const { userValidator, loginValidator } = require("../utils/validations");

const tokenGenerator = (user) => {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    config.get("JWT.SECRET_KEY"),
    { expiresIn: "1h" }
  );
};

module.exports = {
  Mutation: {
    registerUser: async (
      _,
      { registerType: { username, password, confirmPassword, email } }
    ) => {
      // DONE: User Validation
      const { errors, isValid } = userValidator(
        username,
        password,
        confirmPassword,
        email
      );
      if (!isValid) {
        throw new UserInputError("ValidationError", {
          argumentName: "Register Validation",
          errors,
        });
      }
      //    DONE: User Duplication Check
      const userCheckDoc = await User.findOne()
        .where("username")
        .equals(username);
      if (userCheckDoc) {
        throw new UserInputError("User Diplication ", {
          argumentName: "DB -> Username",
          errors: {
            username: "Username is already set.",
          },
        });
      }
      //    DONE: Make a hash of password
      const hashedPassword = await bcryptjs.hash(
        password,
        config.get("passwordSalt")
      );
      const userDoc = await new User({
        username,
        password: hashedPassword,
        email,
        createdAt: new Date().toLocaleDateString(),
      });
      const savedUserDoc = await userDoc.save();
      const token = tokenGenerator(savedUserDoc);
      return {
        ...savedUserDoc._doc,
        id: savedUserDoc._id,
        token,
      };
    },
    login: async (_, { username, password }) => {
      // DONE: User Validation / Sanitization
      const { errors, isValid } = loginValidator(username, password);
      if (!isValid) {
        throw new UserInputError("User Validation", {
          errors,
        });
      }
      const user = await User.findOne({ username: { $eq: username } });
      if (user) {
        const validUser = await bcryptjs.compare(password, user.password);
        if (validUser) {
          const token = tokenGenerator(user);
          return {
            ...user._doc,
            id: user._id,
            token,
          };
        } else {
          throw new AuthenticationError("Wrong Credential");
        }
      } else {
        throw new Error("User Not Found");
      }
    },
  },
};
