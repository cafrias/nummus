import JWTService from "./JWTService"
import { UserTokenPayload } from "../resolvers/Mutation/signup"
import User from "../models/User"
import { Context } from "../global"

import { AuthenticationError } from "apollo-server"

class AuthenticationService {
  async getUserFromAuthHeader(authHeader?: string) {
    if (!authHeader) {
      return null
    }

    const token = authHeader.replace("Bearer ", "")

    try {
      const tokenPayload = JWTService.getTokenPayload<UserTokenPayload>(token)

      const user = await User.findOne({
        _id: tokenPayload._id,
        tokens: { $elemMatch: { $eq: token } },
      })

      return user
    } catch (err) {
      return null
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
