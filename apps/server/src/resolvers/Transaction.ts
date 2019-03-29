import { TransactionResolvers } from "@nummus/schema"
import { Context } from ".."
import { Account } from "~/entity/Account"

const TransactionResolver: TransactionResolvers<Context> = {
  account(record, _, { connection }) {
    return connection.getRepository(Account).findOneOrFail(record.account)
  },
}

export default TransactionResolver
