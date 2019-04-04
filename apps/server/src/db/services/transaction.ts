import { Transaction } from "~/models/Transaction"
import { Account } from "~/models/Account"
import { SpendCategory } from "~/models/SpendCategory"
import { Budget } from "~/models/Budget"

interface CreateTransactionInput {
  account: Account
  amount: number
  category?: SpendCategory
}
type CreateTransactionOuput = {
  entities: [Transaction, Account, Budget]
  optionals: {
    category?: SpendCategory
  }
}

/**
 * Creates a new `Transaction` and returns all entities that have been modified.
 *
 * It requires that `account` has populated the following relations:
 *
 * - `budget`
 *
 * __NOTE__: It mutates `input`, but don't rely on this behavior
 *
 * @param input Input required to create the new `Transaction`
 */
export async function createTransaction(
  input: CreateTransactionInput
): Promise<CreateTransactionOuput> {
  const newTransaction = new Transaction({
    account: input.account,
    amount: Math.abs(input.amount),
    incoming: input.amount > 0,
  })
  input.account.balance += input.amount

  if (input.category) {
    newTransaction.category = input.category
    input.category.spent += input.amount
  } else {
    input.account.budget.toBeBudgeted += input.amount
  }

  return {
    entities: [newTransaction, input.account, input.account.budget],
    optionals: {
      category: input.category,
    },
  }
}
