import { gql } from "apollo-server"

const schema = gql`
  type Query {
    me: User!
  }

  type Mutation {
    signup(input: SignupInput!): SignupOutput!
    login(input: LoginInput!): LoginOutput!
  }

  #
  # User
  #
  type User {
    _id: String!
    email: String!
  }

  input SignupInput {
    email: String!
    password: String!
  }

  type SignupOutput {
    user: User!
    token: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type LoginOutput {
    user: User!
    token: String!
  }
`

export default schema
