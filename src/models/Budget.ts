import { User, userSchema, UserNormalized } from "./User"
import { Currency, currencySchema, CurrencyNormalized } from "./Currency"

import { schema } from "normalizr"
import { NormalizedTree } from "./NormalizedTree"
import { NormalizeResult } from "./NormalizeResult"

// ---------------------------------------------------------------------------------------------------------------------
// Model
// ---------------------------------------------------------------------------------------------------------------------
interface BudgetModel {
  id: string
  name: string

  user: User | string
  currency: Currency | string
}

export interface Budget extends BudgetModel {
  user: User
  currency: Currency
}

export interface BudgetNormalized extends BudgetModel {
  currency: string
  user: string
}

// ---------------------------------------------------------------------------------------------------------------------
// Normalizr
// ---------------------------------------------------------------------------------------------------------------------
export const budgetSchema = new schema.Entity("budgets", {
  user: userSchema,
  currency: currencySchema,
})
export type BudgetNormalizeResult = NormalizeResult<{
  budgets: NormalizedTree<BudgetNormalized>
  users: NormalizedTree<UserNormalized>
  currency: NormalizedTree<CurrencyNormalized>
}>
