import { QueryResolvers } from "@nummus/schema"
import { Context } from ".."
import { SpendCategory } from "~/entity/SpendCategory"
import { Account } from "~/entity/Account"

const Query: QueryResolvers<Context> = {
  spendCategories(obj, args, ctx) {
    return ctx.connection.manager.find(SpendCategory)
  },
  accounts(obj, args, ctx) {
    const repo = ctx.connection.getRepository(Account)

    return repo.find({
      where: {
        budget: { id: args.budgetId },
      },
    })
  },
}

export default Query
