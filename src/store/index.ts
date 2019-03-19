import {
  compose,
  combineReducers,
  createStore,
  applyMiddleware,
  Action,
} from "redux"

import ReduxThunk, { ThunkAction, ThunkDispatch } from "redux-thunk"

import StoreCurrencyReducer, { StoreCurrencyState } from "./currency"
import StoreBudgetReducer, { StoreBudgetState } from "./budget"
import StoreUIReducer, { StoreUIState } from "./ui"

export interface StoreState {
  currency: StoreCurrencyState
  budget: StoreBudgetState
  ui: StoreUIState
}

// ---------------------------------------------------------------------------------------------------------------------
// Helper Types
// ---------------------------------------------------------------------------------------------------------------------
export type SimpleThunkAction<R> = ThunkAction<R, StoreState, undefined, Action>
export type SimpleThunkDispatch = ThunkDispatch<StoreState, undefined, Action>

// ---------------------------------------------------------------------------------------------------------------------
// Root Reducer
// ---------------------------------------------------------------------------------------------------------------------
const rootReducer = combineReducers<StoreState>({
  currency: StoreCurrencyReducer,
  budget: StoreBudgetReducer,
  ui: StoreUIReducer,
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
