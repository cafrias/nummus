import { Context } from "../../global"
import AuthenticationService from "../../services/AuthenticationService"

export default async function me(_: any, __: {}, ctx: Context) {
  return AuthenticationService.checkIfAuthorized(ctx)
}
