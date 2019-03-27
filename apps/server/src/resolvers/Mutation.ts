import { MutationResolvers } from "@nummus/schema"
import { Context } from ".."
import { User } from "~/entity/User"
import { Currency } from "~/entity/Currency"
import { Budget } from "~/entity/Budget"

const Mutation: MutationResolvers<Context> = {
  async createBudget(obj, { input }, { connection }) {
    const [currency, user] = await Promise.all([
      connection
        .getRepository(Currency)
        .findOneOrFail({ id: input.currencyCode }),
      connection.getRepository(User).findOneOrFail({ id: input.userId }),
    ])

    return await connection.getRepository(Budget).create(
      new Budget({
        user,
        currency,
        name: input.name,
      })
    )
  },
}

export default Mutation
