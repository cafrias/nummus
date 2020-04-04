import User, { IUser } from "../../models/User"
import { Context } from "../../global"
import JWTService from "../../services/JWTService"
import { UserTokenPayload } from "./signup"
import PasswordService from "../../services/PasswordService"
import { LoginError } from "../../lib/errors/LoginError"

interface LoginInput {
  input: {
    email: string
    password: string
  }
}

interface LoginOutput {
  user: IUser
  token: string
}

// -------------------------------------------------------------------------------------------------
// Helpers
// -------------------------------------------------------------------------------------------------
/**
 * Handles the refresh token flow
 * @param loggedUser
 * @param currentToken
 */
async function handleRefreshToken(
  loggedUser: IUser,
  inputPassword: string,
  currentToken: string
): Promise<LoginOutput> {
  const validPassword = await PasswordService.compare(
    inputPassword,
    loggedUser.password
  )
  if (!validPassword) {
    throw new LoginError()
  }

  const newToken = JWTService.createToken<UserTokenPayload>({
    _id: loggedUser.id,
    email: loggedUser.email,
  })

  loggedUser.removeToken(currentToken)
  loggedUser.tokens.push(newToken)

  await loggedUser.save()

  return {
    user: loggedUser,
    token: newToken,
  }
}

/**
 * Handles the login flow
 * @param input
 */
async function handleLogin(input: LoginInput["input"]): Promise<LoginOutput> {
  // Not logged in, logs in
  const user = await User.findOne({
    email: input.email,
  })
  if (!user) {
    throw new LoginError()
  }

  const valid = await PasswordService.compare(input.password, user.password)
  if (!valid) {
    throw new LoginError()
  }

  const newToken = JWTService.createToken<UserTokenPayload>({
    _id: user.id,
    email: user.email,
  })
  user.tokens.push(newToken)

  await user.save()

  return {
    user,
    token: newToken,
  }
}

// -------------------------------------------------------------------------------------------------
// Resolver
// -------------------------------------------------------------------------------------------------
export default async function login(
  _: any,
  { input }: LoginInput,
  context: Context
): Promise<LoginOutput> {
  const { user: loggedUser, token } = context
  if (loggedUser && loggedUser.email === input.email && token) {
    return handleRefreshToken(loggedUser, input.password, token)
  }

  return handleLogin(input)
}
