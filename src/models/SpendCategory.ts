import { SpendGroup } from "./SpendGroup"
import { schema } from "normalizr"
import { NormalizeResult } from "./NormalizeResult"
import { NormalizedTree } from "./NormalizedTree"

// ---------------------------------------------------------------------------------------------------------------------
// Model
// ---------------------------------------------------------------------------------------------------------------------
export interface SpendCategoryModel {
  id: string

  /**
   * ID of the `Budget` it belongs to
   */
  budget: string

  name: string
  group: SpendGroup
}

export interface SpendCategory extends SpendCategoryModel {}

export interface SpendCategoryNormalized extends SpendCategoryModel {}

// ---------------------------------------------------------------------------------------------------------------------
// Normalizr
// ---------------------------------------------------------------------------------------------------------------------
export const spendCategorySchema = new schema.Entity("spendCategories")
export interface SpendCategoryNormalizeEntities {
  spendCategories: NormalizedTree<SpendCategoryNormalized>
}
export type SpendCategoryNormalizeResult = NormalizeResult<
  SpendCategoryNormalizeEntities
>
