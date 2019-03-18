import { Action, Reducer } from "redux"

import {
  Budget,
  budgetSchema,
  BudgetNormalized,
  BudgetNormalizeResult,
} from "~/models/Budget"
import { CreateBudgetInput } from "~/services/BudgetService"
import services from "~/services/services"
import { normalize } from "normalizr"
import { SimpleThunkAction } from "."

// ---------------------------------------------------------------------------------------------------------------------
// Action Types
// ---------------------------------------------------------------------------------------------------------------------
export enum StoreBudgetActionTypes {
  Add = "budget/add",
}

// ---------------------------------------------------------------------------------------------------------------------
// Action Creators
// ---------------------------------------------------------------------------------------------------------------------
interface NormalizedTree<T> {
  [id: string]: T
}

interface StoreBudgetAddAction extends Action<StoreBudgetActionTypes.Add> {
  budgets: NormalizedTree<BudgetNormalized>
}
function add(budgets: NormalizedTree<BudgetNormalized>): StoreBudgetAddAction {
  return {
    type: StoreBudgetActionTypes.Add,
    budgets,
  }
}

export const StoreBudgetActionCreators = {
  add,
}

// ---------------------------------------------------------------------------------------------------------------------
// Thunks
// ---------------------------------------------------------------------------------------------------------------------
export type StoreBudgetCreateThunk = (
  input: CreateBudgetInput
) => Promise<Budget>

function create(input: CreateBudgetInput): SimpleThunkAction<Promise<Budget>> {
  return async dispatch => {
    const newBudget = await services.budget.create(input)

    const { entities }: BudgetNormalizeResult = normalize(
      newBudget,
      budgetSchema
    )
    dispatch(add(entities.budgets))

    return newBudget
  }
}

export const StoreBudgetThunks = {
  create,
}

// ---------------------------------------------------------------------------------------------------------------------
// Default State
// ---------------------------------------------------------------------------------------------------------------------
const StoreBudgetDefaultState: StoreBudgetState = {}

export type StoreBudgetState = NormalizedTree<BudgetNormalized>

// ---------------------------------------------------------------------------------------------------------------------
// Reducer
// ---------------------------------------------------------------------------------------------------------------------
const StoreBudgetReducer: Reducer<StoreBudgetState, StoreBudgetAddAction> = (
  state = StoreBudgetDefaultState,
  action
) => {
  switch (action.type) {
    case StoreBudgetActionTypes.Add:
      return { ...state, ...action.budgets }
    default:
      return state
  }
}

export default StoreBudgetReducer
