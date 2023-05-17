import { useQuery, gql } from "@apollo/client";

export const Register_User = gql`
  mutation RegisterUser($name: String!, $email: String!, $password: String!) {
    RegisterUser(name: $name, email: $email, password: $password) {
      _id
      name
      email
    }
  }
`;

export const Update_User = gql`
  mutation UserUpdate(
    $_id: String
    $name: String!
    $email: String!
    $password: String!
  ) {
    UserUpdate(_id: $_id, name: $name, email: $email, password: $password) {
      _id
      name
      email
    }
  }
`;

export const Login_User = gql`
  mutation LoginUser(
    $email: String!
    $password: String!
  ) {
    LoginUser(email: $email, password: $password) {
      _id
      name
      email
    }
  }
`;

export const Del_user = gql`
  mutation DeleteUser($_id: String!) {
    DeleteUser(_id: $_id) {
      message
    }
  }
`
