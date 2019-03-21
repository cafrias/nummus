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
import dataDebugSpendCategory from "~/data/debug/spendCategory";

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

export const StoreSpendCategorySelectors = {
  getAll,
}

// ---------------------------------------------------------------------------------------------------------------------
// Action Creators
// ---------------------------------------------------------------------------------------------------------------------
export interface StoreSpendCategoryAddAction
  extends Action<StoreSpendCategoryActionTypes.Add> {
  payload: NormalizedTree<SpendCategoryNormalized>
}
function add(
  categories: NormalizedTree<SpendCategoryNormalized>
): StoreSpendCategoryAddAction {
  return {
    type: StoreSpendCategoryActionTypes.Add,
    payload: categories,
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
    dispatch(add(entities.spendCategories))

    return newSpendCategory
  }
}

export const StoreSpendCategoryThunks = {
  create,
}

// ---------------------------------------------------------------------------------------------------------------------
// Default State
// ---------------------------------------------------------------------------------------------------------------------
const StoreSpendCategoryDefaultState: StoreSpendCategoryState = dataDebugSpendCategory

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
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export default StoreSpendCategoryReducer
