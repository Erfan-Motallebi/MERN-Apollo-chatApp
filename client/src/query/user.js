import { gql } from "@apollo/client";

export const USER_REGISTER_UPDATE = gql`
  mutation UserRegisterUpdate(
    $username: String!
    $password: String!
    $confirmPassword: String!
    $email: String!
  ) {
    registerUser(
      registerType: {
        username: $username
        password: $password
        confirmPassword: $confirmPassword
        email: $email
      }
    ) {
      id
      username
      password
      email
      createdAt
      token
    }
  }
`;

export const USER_LOGIN_QUERY = gql`
  mutation UserLogin($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
      password
      email
      createdAt
      token
    }
  }
`;
