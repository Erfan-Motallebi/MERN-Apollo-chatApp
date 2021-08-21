const { gql } = require("apollo-server");

module.exports = gql`
  interface UserInfo {
    id: ID!
    username: String!
    createdAt: String!
  }

  type Post implements UserInfo {
    id: ID!
    username: String!
    createdAt: String!
    body: String!
    comments: [Comment]!
    likes: [Like]!
    user: User!
    likeCount: Int!
    commentCount: Int!
  }
  type Comment implements UserInfo {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }
  type Like {
    id: ID!
    username: String!
    createdAt: String!
  }

  type User implements UserInfo {
    id: ID!
    username: String!
    createdAt: String!
    password: String!
    email: String!
    token: String!
  }

  input RegisterType {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }

  type Query {
    getPosts: [Post!]!
    getPost(postId: String): Post!
  }

  type Mutation {
    registerUser(registerType: RegisterType): User!
    login(username: String!, password: String!): User!
    createPost(body: String): Post!
    removePost(postId: String!): String!
    createComment(body: String!, postId: String!): Post!
    deleteComment(postId: String!, commentId: String!): Post!
    likes(postId: String): Post!
  }
  type Subscription {
    newPost: Post!
  }
`;
