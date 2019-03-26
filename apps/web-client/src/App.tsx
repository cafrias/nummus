import * as React from "react"

import ApolloClient from "apollo-boost"

import { Provider } from "react-redux"
import store from "~/store"

// MUI
import CssBaseline from "@material-ui/core/CssBaseline"
import createMuiTheme from "@material-ui/core/styles/createMuiTheme"
import ThemeProvider from "@material-ui/styles/ThemeProvider"

import Root from "./views/Root"
import { ApolloProvider } from "react-apollo"

const theme = createMuiTheme()

// ---------------------------------------------------------------------------------------------------------------------
// Apollo init
// ---------------------------------------------------------------------------------------------------------------------
const client = new ApolloClient({
  uri: process.env.GRAPHQL_ENDPOINT,
})

// ---------------------------------------------------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------------------------------------------------
const App: React.SFC<{}> = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <Root />
        </ThemeProvider>
      </Provider>
    </ApolloProvider>
  )
}

export default App
