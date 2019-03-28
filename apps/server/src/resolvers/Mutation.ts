import { MutationResolvers } from "@nummus/schema"
import { Context } from ".."
import { User } from "~/entity/User"
import { Currency } from "~/entity/Currency"
import { Budget } from "~/entity/Budget"
import { Account } from "~/entity/Account"
import { SpendCategory } from "~/entity/SpendCategory"
import { Transaction } from "~/entity/Transaction"

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

  async createTransaction(_, { input }, { connection }) {
    const [account, category] = await Promise.all([
      connection.getRepository(Account).findOneOrFail(input.accountId),
      connection.getRepository(SpendCategory).findOneOrFail(input.categoryId),
    ])

    return connection.getRepository(Transaction).save(
      new Transaction({
        account,
        category,
        amount: input.amount,
        incoming: input.incoming,
      })
    )
  },
}

export default Mutation
