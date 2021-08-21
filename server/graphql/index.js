const postResolvers = require("../graphql/post");
const userResolvers = require("../graphql/user");

module.exports = {
  Post: {
    likeCount: (parent) => {
      return parent.likes.length;
    },
    commentCount: (parent) => parent.comments.length,
  },
  Query: {
    ...postResolvers.Query,
  },

  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
  },

  Subscription: {
    ...postResolvers.Subscription,
  },
};
