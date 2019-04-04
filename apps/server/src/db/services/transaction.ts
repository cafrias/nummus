import { Transaction } from "~/models/Transaction"
import { Account } from "~/models/Account"
import { SpendCategory } from "~/models/SpendCategory"
import { Budget } from "~/models/Budget"

interface CreateTransactionInput {
  account: Account
  amount: number
  category?: SpendCategory
}

export async function createTransaction(
  input: CreateTransactionInput
): Promise<[Transaction, Account, Budget]> {
  const newTransaction = new Transaction({
    account: input.account,
    amount: Math.abs(input.amount),
    incoming: input.amount > 0,
  })
  input.account.balance += input.amount

  if (input.category) {
    // TODO: move budget from category
  } else {
    input.account.budget.toBeBudgeted += input.amount
  }

  return [newTransaction, input.account, input.account.budget]
}
