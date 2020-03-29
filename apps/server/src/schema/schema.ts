import { gql } from "apollo-server"

const schema = gql`
  type Query {
    me: User!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    login(input: LoginInput!): LoginOutput!
  }

  #
  # User
  #
  type User {
    _id: String!
    email: String!
  }

  input CreateUserInput {
    email: String!
    password: String!
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
