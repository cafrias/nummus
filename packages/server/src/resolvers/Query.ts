import { QueryResolvers } from "~/generated/graphql"
import { Context } from ".."
import { SpendCategory } from "~/entity/SpendCategory"

const Query: QueryResolvers<Context> = {
  async spendCategories(obj, args, ctx) {
    const result = await ctx.connection.manager.find(SpendCategory)
    return result
  },
}

export default Query
