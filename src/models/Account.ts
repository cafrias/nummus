import { Budget } from "./Budget"
import { Transaction } from "./Transaction"

export interface Account {
  id: string

  type: AccountType
  name: string
  budget: Budget

  initialBalance: number
  inTransactions: Transaction[]
  outTransactions: Transaction[]
}

export enum AccountType {
  Bank = "BANK",
  Cash = "CASH",
  CreditCard = "CREDIT_CARD",
}

/**
 * Calculates the current balance of an account.
 *
 * @param account The account to calculate the balance
 */
export function balance(account: Account): number {
  // TODO: implement
  return 0
}
