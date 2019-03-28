import { AccountResolvers } from "@nummus/schema"
import { Context } from ".."

const AccountResolversMap: AccountResolvers<Context> = {
  records(account) {
    return account.records || []
  },
}

export default AccountResolversMap
