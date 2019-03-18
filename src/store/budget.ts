import uuidv4 from "uuid/v4"
import { Action, Reducer } from "redux"

import { Currency } from "~/models/Currency"
import { Budget } from "~/models/Budget"

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
  budgets: NormalizedTree<Budget>
}
function add(budgets: Budget[]): StoreBudgetAddAction {
  const res = budgets.reduce((tree, bud) => {
    tree[bud.id] = bud
    return tree
  }, {})
  return {
    type: StoreBudgetActionTypes.Add,
    budgets: res,
  }
}

export const StoreBudgetActionCreators = {
  add,
}

// ---------------------------------------------------------------------------------------------------------------------
// Default State
// ---------------------------------------------------------------------------------------------------------------------
// TODO: remove before deployment
const firstBudget: Budget = {
  id: uuidv4(),
  currency: {
    code: "ARS",
    name: "Argentine Peso",
  },
  name: "My first budget",
  user: {
    email: "me@example.com",
    name: "Me!",
  },
}

const StoreBudgetDefaultState: StoreBudgetState = {
  [firstBudget.id]: firstBudget,
}

export interface StoreBudgetState {
  [code: string]: Budget
}

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
