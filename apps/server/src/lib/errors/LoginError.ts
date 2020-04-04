import { ApolloError } from "apollo-server"

export class LoginError extends ApolloError {
  static CODE = "LOGIN_ERROR"

  constructor() {
    const message = "The user or the password is wrong"
    super(message, LoginError.CODE)
  }
}
