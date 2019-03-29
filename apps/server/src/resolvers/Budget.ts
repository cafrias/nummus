import { BudgetResolvers } from "@nummus/schema"
import { Context } from ".."
import { Currency } from "~/entity/Currency"
import { Account } from "~/entity/Account"

const BudgetResolver: BudgetResolvers<Context> = {
  currency(budget, _, { connection }) {
    return connection.getRepository(Currency).findOneOrFail(budget.currency)
  },
  accounts(budget, _, { connection }) {
    return connection
      .getRepository(Account)
      .find({ where: { budget: { id: budget.id } } })
  },
}

export default BudgetResolver
