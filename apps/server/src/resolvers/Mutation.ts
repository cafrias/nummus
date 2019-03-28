import { MutationResolvers } from "@nummus/schema"
import { Context } from ".."
import { User } from "~/entity/User"
import { Currency } from "~/entity/Currency"
import { Budget } from "~/entity/Budget"
import { Account } from "~/entity/Account"

const Mutation: MutationResolvers<Context> = {
  async createAccount(_, { input }, { connection }) {
    const [budget] = await Promise.all([
      connection.getRepository(Budget).findOneOrFail({ id: input.budgetId }),
    ])

    return connection.getRepository(Account).save(
      new Account({
        budget,
        initialBalance: input.initialBalance,
        name: input.name,
        type: input.type,
      })
    )
  },

  async createBudget(_, { input }, { connection }) {
    const [currency, user] = await Promise.all([
      connection
        .getRepository(Currency)
        .findOneOrFail({ id: input.currencyCode }),
      connection.getRepository(User).findOneOrFail({ id: input.userId }),
    ])

    return connection.getRepository(Budget).save(
      new Budget({
        user,
        currency,
        name: input.name,
      })
    )
  },
}

export default Mutation
