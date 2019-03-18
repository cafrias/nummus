import { compose, combineReducers, createStore, applyMiddleware } from "redux"

import ReduxThunk from "redux-thunk"

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
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(ReduxThunk))
)

export default store
