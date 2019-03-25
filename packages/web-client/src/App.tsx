import * as React from "react"

import { Provider } from "react-redux"
import store from "~/store"

// MUI
import CssBaseline from "@material-ui/core/CssBaseline"
import createMuiTheme from "@material-ui/core/styles/createMuiTheme"
import ThemeProvider from "@material-ui/styles/ThemeProvider"

import Root from "./views/Root"

const theme = createMuiTheme()

export interface AppProps {}

const App: React.SFC<AppProps> = props => {
  return (
    <Provider store={store}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Root />
      </ThemeProvider>
    </Provider>
  )
}

export default App
