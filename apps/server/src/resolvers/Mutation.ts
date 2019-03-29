import { MutationResolvers } from "@nummus/schema"
import { Context } from ".."
import { User } from "~/models/User"
import { Currency } from "~/models/Currency"
import { Budget } from "~/models/Budget"
import { Account } from "~/models/Account"
import { SpendCategory } from "~/models/SpendCategory"
import { Transaction } from "~/models/Transaction"

const Mutation: MutationResolvers<Context> = {
  async createAccount(_, { input }, { orm }) {
    const [budget] = await Promise.all([
      orm.getRepository(Budget).findOneOrFail({ id: input.budgetId }),
    ])

    return orm.getRepository(Account).save(
      new Account({
        budget,
        initialBalance: input.initialBalance,
        name: input.name,
        type: input.type,
      })
    )
  },

  async createBudget(_, { input }, { orm }) {
    const [currency, user] = await Promise.all([
      orm.getRepository(Currency).findOneOrFail({ id: input.currencyCode }),
      orm.getRepository(User).findOneOrFail({ id: input.userId }),
    ])

    return orm.getRepository(Budget).save(
      new Budget({
        user,
        currency,
        name: input.name,
      })
    )
  },

  async createTransaction(_, { input }, { orm }) {
    const [account, category] = await Promise.all([
      orm.getRepository(Account).findOneOrFail(input.accountId),
      orm.getRepository(SpendCategory).findOneOrFail(input.categoryId),
    ])

    return orm.getRepository(Transaction).save(
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
