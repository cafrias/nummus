import { Action, Reducer } from "redux"

import services from "~/services/services"
import { normalize } from "normalizr"
import { SimpleThunkAction } from "."
import { NormalizedTree } from "~/models/NormalizedTree"
import { CreateAccountInput } from "~/services/AccountService"
import {
  Account,
  AccountNormalized,
  AccountNormalizeResult,
  accountSchema,
} from "~/models/Account"

// ---------------------------------------------------------------------------------------------------------------------
// Action Types
// ---------------------------------------------------------------------------------------------------------------------
export enum StoreAccountActionTypes {
  Add = "account/add",
}

// ---------------------------------------------------------------------------------------------------------------------
// Action Creators
// ---------------------------------------------------------------------------------------------------------------------
export interface StoreAccountAddAction
  extends Action<StoreAccountActionTypes.Add> {
  accounts: NormalizedTree<AccountNormalized>
}
function add(
  accounts: NormalizedTree<AccountNormalized>
): StoreAccountAddAction {
  return {
    type: StoreAccountActionTypes.Add,
    accounts,
  }
}

export const StoreAccountActionCreators = {
  add,
}

// ---------------------------------------------------------------------------------------------------------------------
// Thunks
// ---------------------------------------------------------------------------------------------------------------------
export type StoreAccountCreateThunk = (
  input: CreateAccountInput
) => Promise<Account>

function create(
  input: CreateAccountInput
): SimpleThunkAction<Promise<Account>> {
  return async dispatch => {
    const newAccount = await services.account.create(input)

    const { entities }: AccountNormalizeResult = normalize(
      newAccount,
      accountSchema
    )
    dispatch(add(entities.accounts))

    return newAccount
  }
}

export const StoreAccountThunks = {
  create,
}

// ---------------------------------------------------------------------------------------------------------------------
// Default State
// ---------------------------------------------------------------------------------------------------------------------
const StoreAccountDefaultState: StoreAccountState = {}

export type StoreAccountState = NormalizedTree<AccountNormalized>

// ---------------------------------------------------------------------------------------------------------------------
// Reducer
// ---------------------------------------------------------------------------------------------------------------------
const StoreAccountReducer: Reducer<StoreAccountState, StoreAccountAddAction> = (
  state = StoreAccountDefaultState,
  action
) => {
  switch (action.type) {
    case StoreAccountActionTypes.Add:
      return { ...state, ...action.accounts }
    default:
      return state
  }
}

export default StoreAccountReducer
