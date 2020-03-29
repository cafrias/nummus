import User, { IUser } from "../../models/User"
import { ApolloError } from "apollo-server"
import JWTService from "../../services/JWTService"
import PasswordService from "../../services/PasswordService"
import InternalError from "../../lib/errors/InternalError"

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
abstract class SignUpError extends ApolloError {
  constructor(message: string, code: string) {
    super(`Sign Up Error: ${message}`, code)
  }
}

export class SignUpEmailTakenError extends SignUpError {
  static CODE = "SIGN_UP_EMAIL_TAKEN"

  constructor(user: IUser) {
    const message = `Email ${user.email} is already taken`
    super(message, SignUpEmailTakenError.CODE)
  }
}

export class SignUpWeakPasswordError extends SignUpError {
  static CODE = "SIGN_UP_WEAK_PASSWORD"

  constructor() {
    const message = "Password is too weak"
    super(message, SignUpWeakPasswordError.CODE)
  }
}

export class SignUpInvalidEmailError extends SignUpError {
  static CODE = "SIGN_UP_INVALID_EMAIL"

  constructor() {
    const message = "Email has invalid format"
    super(message, SignUpInvalidEmailError.CODE)
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// Resolver
// ---------------------------------------------------------------------------------------------------------------------
export default async function signup(
  _: any,
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
    if (err.message.startsWith("User validation failed: password")) {
      throw new SignUpWeakPasswordError()
    }

    if (err.message.startsWith("User validation failed: email")) {
      throw new SignUpInvalidEmailError()
    }

    if (err.message.startsWith("E11000 duplicate key")) {
      throw new SignUpEmailTakenError(user)
    }

    throw new InternalError()
  }
}
