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
import { NormalizedTree } from "~/models/NormalizedTree"
import { StoreAccountAddAction, StoreAccountActionTypes } from "./account"

// ---------------------------------------------------------------------------------------------------------------------
// Action Types
// ---------------------------------------------------------------------------------------------------------------------
export enum StoreBudgetActionTypes {
  Add = "budget/add",
}

// ---------------------------------------------------------------------------------------------------------------------
// Action Creators
// ---------------------------------------------------------------------------------------------------------------------
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
const StoreBudgetReducer: Reducer<
  StoreBudgetState,
  StoreBudgetAddAction | StoreAccountAddAction
> = (state = StoreBudgetDefaultState, action) => {
  switch (action.type) {
    case StoreBudgetActionTypes.Add:
      return { ...state, ...action.budgets }
    case StoreAccountActionTypes.Add:
      // TODO: refactor it? maybe using Normalizr, investigate better option
      const newState: StoreBudgetState = {}
      for (const account of Object.values(action.accounts)) {
        newState[account.budget] = {
          ...state[account.budget],
          accounts: [...state[account.budget].accounts, account.id],
        }
      }
      return newState
    default:
      return state
  }
}

export default StoreBudgetReducer
