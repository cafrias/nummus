import JWTService from "./JWTService"
import { UserTokenPayload } from "../resolvers/Mutation/signup"
import User, { IUser } from "../models/User"
import { Context } from "../global"

import { AuthenticationError } from "apollo-server"

class AuthenticationService {
  // TODO: add test
  async getUserAndTokenFromAuthHeader(
    authHeader?: string
  ): Promise<[IUser | null, string | null]> {
    if (!authHeader) {
      return [null, null]
    }

    const token = authHeader.replace("Bearer ", "")

    try {
      const tokenPayload = JWTService.getTokenPayload<UserTokenPayload>(token)

      const user = await User.findOne({
        _id: tokenPayload._id,
        tokens: { $elemMatch: { $eq: token } },
      })

      return [user, token]
    } catch (err) {
      return [null, null]
    }
  }

  checkIfAuthorized(ctx: Context) {
    if (!ctx.user) {
      throw new AuthenticationError("Not Authenticated")
    }

    return ctx.user
  }
}

export default new AuthenticationService()
