import {
  Transaction,
  TransactionNormalizeResult,
  transactionSchema,
  TransactionNormalized,
  TransactionNormalizeEntities,
} from "./Transaction"
import { schema } from "normalizr"
import { NormalizeResult } from "./NormalizeResult"
import { NormalizedTree } from "./NormalizedTree"

// ---------------------------------------------------------------------------------------------------------------------
// Model
// ---------------------------------------------------------------------------------------------------------------------
export interface AccountModel {
  id: string

  type: AccountType
  name: string

  /**
   * The ID of the `Budget` this `Account` belogs to.
   */
  budget: string

  initialBalance: number
  inTransactions: Transaction[] | string[]
  outTransactions: Transaction[] | string[]
}

export interface Account extends AccountModel {
  inTransactions: Transaction[]
  outTransactions: Transaction[]
}

export interface AccountNormalized extends AccountModel {
  inTransactions: string[]
  outTransactions: string[]
}

export enum AccountType {
  Bank = "BANK",
  Cash = "CASH",
  CreditCard = "CREDIT_CARD",
}

// ---------------------------------------------------------------------------------------------------------------------
// Normalizr
// ---------------------------------------------------------------------------------------------------------------------
export const accountSchema = new schema.Entity("accounts", {
  transactions: [transactionSchema],
})
export interface AccountNormalizeEntities extends TransactionNormalizeEntities {
  accounts: NormalizedTree<AccountNormalized>
}
export type AccountNormalizeResult = NormalizeResult<AccountNormalizeEntities>

// ---------------------------------------------------------------------------------------------------------------------
// Functions
// ---------------------------------------------------------------------------------------------------------------------
/**
 * Calculates the current balance of an account.
 *
 * @param account The account to calculate the balance
 */
export function balance(account: Account): number {
  // TODO: implement
  return 0
}
