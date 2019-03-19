import { Action, Reducer } from "redux"
import { createSelector } from "reselect"

import { StoreState } from "./index"
import { Currency } from "~/models/Currency"
import dataDebugCurrencies from "~/data/debug/currency"
import { NormalizedTree } from "~/models/NormalizedTree"

// ---------------------------------------------------------------------------------------------------------------------
// Action Types
// ---------------------------------------------------------------------------------------------------------------------
export enum StoreCurrencyActionTypes {}

// ---------------------------------------------------------------------------------------------------------------------
// Selectors
// ---------------------------------------------------------------------------------------------------------------------
const getAll = createSelector(
  [(state: StoreState) => state.currency],
  currencies => Object.values(currencies)
)

export const StoreCurrencySelectors = {
  getAll,
}

// ---------------------------------------------------------------------------------------------------------------------
// Default State
// ---------------------------------------------------------------------------------------------------------------------
// TODO: Remove hard-coded currencies when support for more currencies is available
const StoreCurrencyDefaultState: StoreCurrencyState = dataDebugCurrencies

export type StoreCurrencyState = NormalizedTree<Currency>

// ---------------------------------------------------------------------------------------------------------------------
// Reducer
// ---------------------------------------------------------------------------------------------------------------------
const StoreCurrencyReducer: Reducer<StoreCurrencyState, Action<any>> = (
  state = StoreCurrencyDefaultState,
  action
) => {
  switch (action.type) {
    default:
      return state
  }
}

export default StoreCurrencyReducer
