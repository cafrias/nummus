import { ApolloError } from "apollo-server"

export class NotFoundError extends ApolloError {
  static CODE = "NOT_FOUND_ERROR"

  constructor() {
    const message = "Resource not found"
    super(message, NotFoundError.CODE)
  }
}
