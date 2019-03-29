import { QueryResolvers } from "@nummus/schema"
import { Context } from ".."
import { SpendCategory } from "~/models/SpendCategory"
import { Account } from "~/models/Account"
import { Currency } from "~/models/Currency"
import { User } from "~/models/User"
import { Budget } from "~/models/Budget"

const Query: QueryResolvers<Context> = {
  async accounts(obj, args, { orm }) {
    const repo = orm.getRepository(Account)

    const accounts = await repo.find({
      where: {
        budget: { id: args.budgetId },
      },
    })

    return accounts as any
  },

  budgets(_, { userId }, { orm }) {
    return orm
      .getRepository(Budget)
      .find({ where: { user: { id: userId } } }) as any
  },

  currencies(_, __, { orm }) {
    return orm.manager.find(Currency)
  },

  async me(_, __, { orm }) {
    const users = await orm.manager.find(User)
    return users[0]
  },

  spendCategories(obj, args, { orm }) {
    return orm.manager.find(SpendCategory)
  },
}

export default Query
