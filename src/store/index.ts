import { combineReducers, createStore } from "redux"

import StoreCurrencyReducer, { StoreCurrencyState } from "./currency"
import StoreBudgetReducer, { StoreBudgetState } from "./budget"

export interface StoreState {
  currency: StoreCurrencyState
  budget: StoreBudgetState
}

// ---------------------------------------------------------------------------------------------------------------------
// Root Reducer
// ---------------------------------------------------------------------------------------------------------------------
const rootReducer = combineReducers<StoreState>({
  currency: StoreCurrencyReducer,
  budget: StoreBudgetReducer,
})

// ---------------------------------------------------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------------------------------------------------
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
