import * as React from "react"
import {
  createStore,
  Store,
  Reducer,
  Action,
  DeepPartial,
  applyMiddleware,
} from "redux"
import { render, RenderResult } from "react-testing-library"
import { Provider } from "react-redux"
import ReduxThunk from "redux-thunk"

/**
 * @template S The type of the Redux store State
 */
interface Options<S> {
  initialState?: DeepPartial<S>
  store?: Store<S>
  reducer?: Reducer<S>
}

export type RenderWithReduxResult<S> = RenderResult & { store: Store<S> }

/**
 * Renders a component wrapping using `react-testing-library` it with `react-redux` `Provider`.
 *
 * @param component The component to render
 * @param options The options object
 */
export default function renderWithRedux<S>(
  component: React.ReactNode,
  {
    initialState,
    reducer,
    store = createStore<S, Action, {}, {}>(
      reducer,
      initialState,
      applyMiddleware(ReduxThunk)
    ),
  }: Options<S> = {}
) {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  }
}
