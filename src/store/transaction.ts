import { Action, Reducer } from "redux"

import services from "~/services/services"
import { normalize } from "normalizr"
import { SimpleThunkAction } from "."
import { NormalizedTree } from "~/models/NormalizedTree"
import {
  TransactionNormalized,
  Transaction,
  TransactionNormalizeResult,
  transactionSchema,
} from "~/models/Transaction"
import { CreateTransactionInput } from "~/services/TransactionService"

// ---------------------------------------------------------------------------------------------------------------------
// Action Types
// ---------------------------------------------------------------------------------------------------------------------
export enum StoreTransactionActionTypes {
  Add = "transaction/add",
}

// ---------------------------------------------------------------------------------------------------------------------
// Action Creators
// ---------------------------------------------------------------------------------------------------------------------
export interface StoreTransactionAddAction
  extends Action<StoreTransactionActionTypes.Add> {
  payload: NormalizedTree<TransactionNormalized>
}
function add(
  transactions: NormalizedTree<TransactionNormalized>
): StoreTransactionAddAction {
  return {
    type: StoreTransactionActionTypes.Add,
    payload: transactions,
  }
}

export const StoreTransactionActionCreators = {
  add,
}

// ---------------------------------------------------------------------------------------------------------------------
// Thunks
// ---------------------------------------------------------------------------------------------------------------------
export type StoreTransactionCreateThunk = (
  input: CreateTransactionInput
) => Promise<Transaction[]>

function create(
  input: CreateTransactionInput
): SimpleThunkAction<Promise<Transaction[]>> {
  return async dispatch => {
    const newTransactions = await services.transaction.create(input)

    const { entities }: TransactionNormalizeResult = normalize(
      newTransactions,
      [transactionSchema]
    )
    dispatch(add(entities.transactions))

    return newTransactions
  }
}

export const StoreTransactionThunks = {
  create,
}

// ---------------------------------------------------------------------------------------------------------------------
// Default State
// ---------------------------------------------------------------------------------------------------------------------
const StoreTransactionDefaultState: StoreTransactionState = {}

export type StoreTransactionState = NormalizedTree<TransactionNormalized>

// ---------------------------------------------------------------------------------------------------------------------
// Reducer
// ---------------------------------------------------------------------------------------------------------------------
const StoreTransactionReducer: Reducer<
  StoreTransactionState,
  StoreTransactionAddAction
> = (state = StoreTransactionDefaultState, action) => {
  switch (action.type) {
    case StoreTransactionActionTypes.Add:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export default StoreTransactionReducer
