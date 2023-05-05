import { useQuery, gql } from "@apollo/client";

export const register_User = gql`
  mutation registerUser($name: String!, $email: String!, $password: String!) {
    registerUser(name: $name, email: $email, password: $password) {
      _id
      name
      email
    }
  }
`;

export const Update_User = gql`
  mutation userUpdate(
    $_id: String
    $name: String!
    $email: String!
    $password: String!
  ) {
    userUpdate(_id: $_id, name: $name, email: $email, password: $password) {
      _id
      name
      email
    }
  }
`;

export const Login_User = gql`
  mutation loginUser(
    $email: String!
    $password: String!
  ) {
    loginUser(email: $email, password: $password) {
      _id
      name
      email
    }
  }
`;

export const del_user = gql`
  mutation deleteUser($_id: String!) {
    deleteUser(_id: $_id) {
      message
    }
  }
`
