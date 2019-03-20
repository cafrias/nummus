import {
  compose,
  combineReducers,
  createStore,
  applyMiddleware,
  Action,
} from "redux"

import ReduxThunk, { ThunkAction, ThunkDispatch } from "redux-thunk"

// ---------------------------------------------------------------------------------------------------------------------
// Reducers
// ---------------------------------------------------------------------------------------------------------------------
import StoreCurrencyReducer, { StoreCurrencyState } from "./currency"
import StoreBudgetReducer, { StoreBudgetState } from "./budget"
import StoreUIReducer, { StoreUIState } from "./ui"
import StoreAccountReducer, { StoreAccountState } from "./account"

export interface StoreState {
  account: StoreAccountState
  budget: StoreBudgetState
  currency: StoreCurrencyState
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
  account: StoreAccountReducer,
  budget: StoreBudgetReducer,
  currency: StoreCurrencyReducer,
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
