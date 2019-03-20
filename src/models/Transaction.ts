import {
  SpendCategory,
  SpendCategoryNormalizeResult,
  spendCategorySchema,
  SpendCategoryNormalizeEntities,
} from "./SpendCategory"
import { schema } from "normalizr"
import { NormalizeResult } from "./NormalizeResult"
import { NormalizedTree } from "./NormalizedTree"

// ---------------------------------------------------------------------------------------------------------------------
// Model
// ---------------------------------------------------------------------------------------------------------------------
export interface TransactionModel {
  id: string

  /**
   * ID of the origin `Account` if existing
   */
  to?: string

  /**
   * ID of the destination `Account` if existing
   */
  from?: string

  category: SpendCategory | string
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
})
export interface TransactionNormalizeEntities
  extends SpendCategoryNormalizeEntities {
  transactions: NormalizedTree<TransactionNormalized>
}
export type TransactionNormalizeResult = NormalizeResult<
  TransactionNormalizeEntities
>
