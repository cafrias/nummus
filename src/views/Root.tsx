import * as React from "react"

import { Router } from "@reach/router"

import Dashboard from "./Dashboard"
import BudgetViews from "./Budget"

export interface RootProps {}

const Root: React.SFC<RootProps> = props => {
  return (
    <Router>
      <Dashboard path="/" />
      <BudgetViews.Create path="/budgets/create" />
    </Router>
  )
}

export default Root
