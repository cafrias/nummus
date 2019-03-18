import * as React from "react"

import { Provider } from "react-redux"
import store from "~/store"

// MUI
import CssBaseline from "@material-ui/core/CssBaseline"

import Root from "./views/Root"

export interface AppProps {}

const App: React.SFC<AppProps> = props => {
  return (
    <Provider store={store}>
      <CssBaseline />
      <Root />
    </Provider>
  )
}

export default App
