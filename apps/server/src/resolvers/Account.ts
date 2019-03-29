import { AccountResolvers } from "@nummus/schema"
import { Context } from ".."
import { Record } from "~/entity/Record"
import { Budget } from "~/entity/Budget"

const AccountResolversMap: AccountResolvers<Context> = {
  records(account, _, { connection }) {
    return connection
      .getRepository(Record)
      .find({ where: { account: { id: account.id } } })
  },
  budget(account, _, { connection }) {
    return connection.getRepository(Budget).findOneOrFail(account.budget)
  },
}

export default AccountResolversMap
