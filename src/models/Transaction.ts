import {
  SpendCategory,
  spendCategorySchema,
  SpendCategoryNormalizeEntities,
} from "./SpendCategory"
import { schema } from "normalizr"
import { NormalizeResult } from "./NormalizeResult"
import { NormalizedTree } from "./NormalizedTree"
import { AccountNormalized, accountSchema } from "./Account"
import { Entity } from "./Entity"

// ---------------------------------------------------------------------------------------------------------------------
// Model
// ---------------------------------------------------------------------------------------------------------------------
export interface TransactionModel {
  id: string

  account: string

  /**
   * ID of the `Transaction` it's related to, if existing. This is used whenever there's money transfer
   * between two accounts, there should be one outgoing `Transaction` in the origin `Account`, and another incoming `Transaction`
   * in the destination `Account`. If this value is `undefined`, it means the `Transaction` comes from or goes to the _outside world_.
   */
  pairTransaction?: string

  category: SpendCategory | string

  amount: number

  incoming: boolean
}

export interface Transaction extends TransactionModel {
  category: SpendCategory
}

export interface TransactionNormalized extends TransactionModel {
  category: string
}

// ---------------------------------------------------------------------------------------------------------------------
// Normalizr
// ---------------------------------------------------------------------------------------------------------------------
export const transactionSchema = new schema.Entity("transactions", {
  category: spendCategorySchema,
  account: accountSchema,
})
export interface TransactionNormalizeEntities
  extends SpendCategoryNormalizeEntities {
  transactions: NormalizedTree<TransactionNormalized>
  accounts: NormalizedTree<AccountNormalized>
}
export type TransactionNormalizeResult = NormalizeResult<
  TransactionNormalizeEntities
>
