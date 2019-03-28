import { QueryResolvers } from "@nummus/schema"
import { Context } from ".."
import { SpendCategory } from "~/entity/SpendCategory"
import { Account } from "~/entity/Account"
import { Currency } from "~/entity/Currency"
import { User } from "~/entity/User"

const Query: QueryResolvers<Context> = {
  async accounts(obj, args, ctx) {
    const repo = ctx.connection.getRepository(Account)

    const accounts = await repo.find({
      where: {
        budget: { id: args.budgetId },
      },
    })

    return accounts
  },

  currencies(_, __, { connection }) {
    return connection.manager.find(Currency)
  },

  async me(_, __, { connection }) {
    const users = await connection.manager.find(User)
    return users[0]
  },

  spendCategories(obj, args, ctx) {
    return ctx.connection.manager.find(SpendCategory)
  },
}

export default Query
