import { Action, Reducer, DeepPartial } from "redux"

import merge from "lodash/merge"

import services from "~/services/services"
import { normalize, denormalize } from "normalizr"
import { SimpleThunkAction, StoreState } from "."
import { NormalizedTree } from "~/models/NormalizedTree"
import { CreateAccountInput } from "~/services/AccountService"
import {
  Account,
  AccountNormalized,
  AccountNormalizeResult,
  accountSchema,
} from "~/models/Account"
import {
  StoreTransactionAddAction,
  StoreTransactionActionTypes,
} from "./transaction"
import updateReferences from "~/utils/updateReferences"
import { createSelector } from "reselect"
import dataDebugAccount from "~/data/debug/account";

// ---------------------------------------------------------------------------------------------------------------------
// Action Types
// ---------------------------------------------------------------------------------------------------------------------
export enum StoreAccountActionTypes {
  Add = "account/add",
}

// ---------------------------------------------------------------------------------------------------------------------
// Selectors
// ---------------------------------------------------------------------------------------------------------------------
const getAll = createSelector(
  [(state: StoreState) => state.account],
  (account): Account[] => denormalize(Object.keys(account), [accountSchema], { accounts: account})
)

export const StoreAccountSelectors = {
  getAll,
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
const StoreAccountDefaultState: StoreAccountState = dataDebugAccount

export type StoreAccountState = NormalizedTree<AccountNormalized>

// ---------------------------------------------------------------------------------------------------------------------
// Reducer
// ---------------------------------------------------------------------------------------------------------------------
const StoreAccountReducer: Reducer<
  StoreAccountState,
  StoreAccountAddAction | StoreTransactionAddAction
> = (state = StoreAccountDefaultState, action) => {
  switch (action.type) {
    case StoreAccountActionTypes.Add:
      return { ...state, ...action.accounts }
    case StoreTransactionActionTypes.Add:
      return updateReferences<typeof state, typeof action.payload>(
        state,
        "account",
        "transactions",
        action.payload
      )
    default:
      return state
  }
}

export default StoreAccountReducer
