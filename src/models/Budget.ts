import { User, userSchema, UserNormalized } from "./User"
import { Currency, currencySchema, CurrencyNormalized } from "./Currency"

import { schema } from "normalizr"
import { NormalizedTree } from "./NormalizedTree"
import { NormalizeResult } from "./NormalizeResult"
import { Account, AccountNormalizeEntities } from "./Account"

// ---------------------------------------------------------------------------------------------------------------------
// Model
// ---------------------------------------------------------------------------------------------------------------------
interface BudgetModel {
  id: string
  name: string

  user: User | string
  currency: Currency | string
  accounts: Account[] | string[]
}

export interface Budget extends BudgetModel {
  user: User
  currency: Currency
  accounts: Account[]
}

export interface BudgetNormalized extends BudgetModel {
  currency: string
  user: string
  accounts: string[]
}

// ---------------------------------------------------------------------------------------------------------------------
// Normalizr
// ---------------------------------------------------------------------------------------------------------------------
export const budgetSchema = new schema.Entity("budgets", {
  user: userSchema,
  currency: currencySchema,
})
export interface BudgetNormalizeEntities extends AccountNormalizeEntities {
  budgets: NormalizedTree<BudgetNormalized>
  users: NormalizedTree<UserNormalized>
  currency: NormalizedTree<CurrencyNormalized>
}
export type BudgetNormalizeResult = NormalizeResult<BudgetNormalizeEntities>
