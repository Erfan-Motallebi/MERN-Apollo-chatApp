//      MODULE:
const jwt = require("jsonwebtoken");
const config = require("config");
const { AuthenticationError } = require("apollo-server");

module.exports.authCheck = (req) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, config.get("JWT.SECRET_KEY"));
        return user;
      } catch (err) {
        throw new AuthenticationError("Invalid/Expired Token");
      }
    } else {
      throw new AuthenticationError("Authentication Bearer not filled");
    }
  } else {
    throw new AuthenticationError("Authorization must be provided");
  }
};
