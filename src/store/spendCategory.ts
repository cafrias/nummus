import { Action, Reducer } from "redux"

import services from "~/services/services"
import { normalize } from "normalizr"
import { SimpleThunkAction, StoreState } from "."
import { NormalizedTree } from "~/models/NormalizedTree"
import { CreateSpendCategoryInput } from "~/services/SpendCategoryService"
import {
  SpendCategory,
  SpendCategoryNormalized,
  SpendCategoryNormalizeResult,
  spendCategorySchema,
} from "~/models/SpendCategory"
import {
  StoreTransactionAddAction,
  StoreTransactionActionTypes,
} from "./transaction"
import updateReferences from "~/utils/updateReferences"
import { createSelector } from "reselect"

// ---------------------------------------------------------------------------------------------------------------------
// Action Types
// ---------------------------------------------------------------------------------------------------------------------
export enum StoreSpendCategoryActionTypes {
  Add = "spendCategory/add",
}

// ---------------------------------------------------------------------------------------------------------------------
// Selectors
// ---------------------------------------------------------------------------------------------------------------------
const getAll = createSelector(
  [(state: StoreState) => state.spendCategory],
  spendCategory => Object.values(spendCategory)
)

export const StoreCurrencySelectors = {
  getAll,
}

// ---------------------------------------------------------------------------------------------------------------------
// Action Creators
// ---------------------------------------------------------------------------------------------------------------------
export interface StoreSpendCategoryAddAction
  extends Action<StoreSpendCategoryActionTypes.Add> {
  spendCategorys: NormalizedTree<SpendCategoryNormalized>
}
function add(
  spendCategorys: NormalizedTree<SpendCategoryNormalized>
): StoreSpendCategoryAddAction {
  return {
    type: StoreSpendCategoryActionTypes.Add,
    spendCategorys,
  }
}

export const StoreSpendCategoryActionCreators = {
  add,
}

// ---------------------------------------------------------------------------------------------------------------------
// Thunks
// ---------------------------------------------------------------------------------------------------------------------
export type StoreSpendCategoryCreateThunk = (
  input: CreateSpendCategoryInput
) => Promise<SpendCategory>

function create(
  input: CreateSpendCategoryInput
): SimpleThunkAction<Promise<SpendCategory>> {
  return async dispatch => {
    const newSpendCategory = await services.spendCategory.create(input)

    const { entities }: SpendCategoryNormalizeResult = normalize(
      newSpendCategory,
      spendCategorySchema
    )
    dispatch(add(entities.spendCategorys))

    return newSpendCategory
  }
}

export const StoreSpendCategoryThunks = {
  create,
}

// ---------------------------------------------------------------------------------------------------------------------
// Default State
// ---------------------------------------------------------------------------------------------------------------------
const StoreSpendCategoryDefaultState: StoreSpendCategoryState = {}

export type StoreSpendCategoryState = NormalizedTree<SpendCategoryNormalized>

// ---------------------------------------------------------------------------------------------------------------------
// Reducer
// ---------------------------------------------------------------------------------------------------------------------
const StoreSpendCategoryReducer: Reducer<
  StoreSpendCategoryState,
  StoreSpendCategoryAddAction | StoreTransactionAddAction
> = (state = StoreSpendCategoryDefaultState, action) => {
  switch (action.type) {
    case StoreSpendCategoryActionTypes.Add:
      return { ...state, ...action.spendCategorys }
    case StoreTransactionActionTypes.Add:
      return updateReferences<typeof state, typeof action.payload>(
        state,
        "spendCategory",
        "transactions",
        action.payload
      )
    default:
      return state
  }
}

export default StoreSpendCategoryReducer
