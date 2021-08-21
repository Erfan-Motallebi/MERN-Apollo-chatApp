import { gql } from "@apollo/client";

export const POST_FETCH_QUERY = gql`
  query GetPostQuery {
    getPosts {
      id
      username
      body
      createdAt
      likes {
        username
      }
      comments {
        id
        username
        body
        createdAt
      }
      likeCount
      commentCount
    }
  }
`;

export const CREATE_POST_MUTATION = gql`
  mutation CreatePostMutation($body: String!) {
    createPost(body: $body) {
      id
      username
      body
      createdAt
      likes {
        id
        username
        createdAt
      }
      comments {
        id
        username
        createdAt
        body
      }
      likeCount
      commentCount
    }
  }
`;

export const POST_LIKE_MUTATION = gql`
  mutation UserLikeMutation($postId: String!) {
    likes(postId: $postId) {
      id
      likes {
        username
        createdAt
      }
      likeCount
    }
  }
`;

export const POST_DELETE_QUERY = gql`
  mutation DeletePostQuery($postId: String!) {
    removePost(postId: $postId)
  }
`;

export const SINGLE_POST_FETCH_QUERY = gql`
  query SinglePostFetchQuery($postId: String!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
        createdAt
      }
      commentCount
      comments {
        id
        username
        body
        createdAt
      }
    }
  }
`;
