import User, { IUser } from "../../models/User"
import { ApolloError } from "apollo-server"
import JWTService from "../../services/JWTService"

// ---------------------------------------------------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------------------------------------------------
export interface SignupInput {
  input: {
    email: IUser["email"]
    password: string
  }
}

export interface SignupOutput {
  user: IUser
  token: string
}

export interface UserTokenPayload {
  _id: IUser["id"]
  email: IUser["email"]
}

// ---------------------------------------------------------------------------------------------------------------------
// Errors
// ---------------------------------------------------------------------------------------------------------------------
export class UserEmailTaken extends ApolloError {
  static CODE = "USER_EMAIL_TAKEN"

  constructor(user: IUser) {
    const message = `Email ${user.email} is already taken`
    super(message, UserEmailTaken.CODE)
  }
}

export class InternalError extends ApolloError {
  static CODE = "INTERNAL_SERVER_ERROR"

  constructor() {
    const message = "Internal Server Error"
    super(message, InternalError.CODE)
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// Resolver
// ---------------------------------------------------------------------------------------------------------------------
export default async function signup(
  _,
  { input }: SignupInput
): Promise<SignupOutput> {
  const user = new User(input)

  try {
    const token = JWTService.createToken<UserTokenPayload>({
      _id: user.id,
      email: user.email,
    })
    user.tokens.push(token)
    await user.save()
    return {
      user,
      token,
    }
  } catch (err) {
    if (err.message.startsWith("E11000 duplicate key")) {
      throw new UserEmailTaken(user)
    }

    throw new InternalError()
  }
}
