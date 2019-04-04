import { MutationResolvers } from "@nummus/schema"
import { Context } from ".."
import { User } from "~/models/User"
import { Currency } from "~/models/Currency"
import { Budget } from "~/models/Budget"
import { Account } from "~/models/Account"
import { SpendCategory } from "~/models/SpendCategory"
import { Transaction } from "~/models/Transaction"
import { Record } from "~/models/Record"
import { Transfer } from "~/models/Transfer"
import { createTransaction } from "~/db/services/transaction"

const Mutation: MutationResolvers<Context> = {
  async createAccount(_, { input }, { orm }) {
    const [budget] = await Promise.all([
      orm.getRepository(Budget).findOneOrFail({ id: input.budgetId }),
    ])

    return orm.transaction(async tManager => {
      const newAccount = new Account({
        budget,
        balance: 0,
        name: input.name,
        type: input.type,
      })

      if (input.initialBalance) {
        const entities = await createTransaction({
          account: newAccount,
          amount: input.initialBalance,
        })
        await tManager.save(entities)
        return entities[1]
      }

      return tManager.save(newAccount)
    })
  },

  async createBudget(_, { input }, { orm }) {
    const [currency, user] = await Promise.all([
      orm.getRepository(Currency).findOneOrFail(input.currencyCode),
      orm.getRepository(User).findOneOrFail(input.userId),
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
      orm
        .getRepository(SpendCategory)
        .findOne({ where: { id: input.categoryId } }),
    ])

    const trans = await orm.getRepository(Transaction).save(
      new Transaction({
        account,
        category,
        amount: input.amount,
        incoming: input.incoming,
      })
    )

    return trans
  },

  async createTransfer(_, { input }, { orm }) {
    // TODO: validate origin and destination are different
    const [origin, destination] = await Promise.all([
      orm.getRepository(Account).findOneOrFail(input.origin),
      orm.getRepository(Account).findOneOrFail(input.destination),
    ])

    const [originTransfer, destinationTransfer] = await orm.transaction(
      async entityManager => {
        const outgoing = await entityManager.save(
          new Transfer({
            account: origin,
            amount: input.amount,
            incoming: false,
          })
        )

        const incoming = new Transfer({
          account: destination,
          amount: input.amount,
          incoming: true,
          pair: outgoing,
        })

        outgoing.pair = incoming

        return entityManager.save([outgoing, incoming])
      }
    )

    return {
      origin: originTransfer,
      destination: destinationTransfer,
    }
  },
}

export default Mutation
