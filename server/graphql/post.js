const { AuthenticationError, UserInputError } = require("apollo-server");
const postModel = require("../models/post.model");
const Post = require("../models/post.model");
const { authCheck } = require("../utils/authCheck");

module.exports = {
  Query: {
    getPosts: async () => {
      const postDoc = await Post.find({})
        .sort({ createdAt: "descending" })
        .populate("user");
      return await postDoc;
    },
    async getPost(_, { postId }) {
      const post = await Post.findById(postId).populate("user");
      if (post) {
        return post;
      } else {
        throw new Error("Post not found");
      }
    },
  },
  Mutation: {
    async createPost(_, { body }, { req, pubsub }) {
      const { username, id } = authCheck(req);

      if (body.trim() !== "") {
        const newPost = await new Post({
          body,
          username,
          user: id,
          createdAt: new Date().toLocaleString(),
        });
        const post = await newPost.save();
        pubsub.publish("NEW_POST", {
          newPost: post,
        });
        return post;
      } else {
        throw new Error("Post field must not be empty");
      }
    },
    async removePost(_, { postId }, { req }) {
      const { username } = authCheck(req);
      const fetchedPost = await Post.findById(postId);
      if (fetchedPost) {
        if (username === fetchedPost.username) {
          await fetchedPost.remove();
          return "Post was deleted Successfully";
        } else {
          throw new AuthenticationError("You not allowed to post");
        }
      } else {
        throw new Error("Post not found");
      }
    },
    createComment: async (_, { body, postId }, { req }) => {
      // 1. TODO: User Authorization Check DONE:
      // 2. TODO: Body Sanitization DONE:
      // 3. TODO: availability of both post and comment related to the user DONE:
      const { username } = authCheck(req);
      if (body.trim === "") {
        throw new UserInputError("Empty Comment", {
          errors: {
            body: "Comment body must not be empty.",
          },
        });
      }
      const post = await Post.findById(postId);
      if (post) {
        await post.comments.unshift({
          body,
          username,
          createdAt: new Date().toLocaleString(),
        });

        await post.save();
        return post;
      } else {
        throw new Error("Post not found");
      }
    },
    // 1. TODO: User Authorization Check DONE:
    // 2. TODO: availibility of the post DONE:
    // 3. TODO: find the proper comment related to the authorized user to remove DONE:
    async deleteComment(_, { postId, commentId }, { req }) {
      const { username, id } = authCheck(req);
      const post = await Post.findById(postId);
      if (post) {
        const fetchedComment = post.comments.findIndex((cmt) => {
          return cmt.username === username;
        });
        if (fetchedComment !== -1) {
          post.comments.splice(fetchedComment, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationError("You not allowed to comment");
        }
      } else {
        throw new Error("Post not found");
      }
    },
    // 1. TODO: User Authorization Check DONE:
    // 2. TODO: availibility of the post DONE:
    // 3. TODO: find the authorized user related to the post DONE:
    // 4. TODO: Like id its unliked, do the opposite DONE:
    likes: async (_, { postId }, { req }) => {
      const { username } = authCheck(req);
      const post = await Post.findById(postId);
      if (post) {
        const validUserLike = post.likes.findIndex((cmt) => {
          return cmt.username === username;
        });
        if (validUserLike !== -1) {
          post.likes.splice(validUserLike, 1);
          await post.save();
        } else {
          await post.likes.push({
            username,
            createdAt: new Date().toLocaleString(),
          });
          await post.save();
        }
      } else {
        throw new Error("Post not found");
      }
      return post;
    },
  },
  Subscription: {
    newPost: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(["NEW_POST"]),
    },
  },
};
