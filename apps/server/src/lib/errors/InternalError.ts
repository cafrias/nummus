import { ApolloError } from "apollo-server"

export default class InternalError extends ApolloError {
  static CODE = "INTERNAL_SERVER_ERROR"

  constructor() {
    const message = "Internal Server Error"
    super(message, InternalError.CODE)
  }
}
