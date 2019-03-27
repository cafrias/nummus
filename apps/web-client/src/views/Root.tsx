import * as React from "react"

import { Router } from "@reach/router"

// Components
import UISnackbar from "~/components/UI/Snackbar"

// MUI
import { makeStyles, createStyles } from "@material-ui/styles"

// Routes
import Dashboard from "./Dashboard"
import BudgetViews from "./budgets"

// ---------------------------------------------------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------------------------------------------------
const useStyles = makeStyles(
  createStyles({
    container: {
      margin: "0 auto",
      maxWidth: "1200px",
      padding: "0.75rem",
    },
  })
)

// ---------------------------------------------------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------------------------------------------------
export interface RootProps {}

// ---------------------------------------------------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------------------------------------------------
const Root: React.SFC<RootProps> = props => {
  const classes = useStyles()

  return (
    <>
      <div className={classes.container}>
        <Router>
          <Dashboard path="/" />
          <BudgetViews.Create path="/budgets/create" />
          <BudgetViews.accounts.create path="/budgets/:budgetId/accounts/create" />
          <BudgetViews.records.create path="/budgets/:budgetId/records/create">
            <BudgetViews.records.transactions.create path="/" />
            <BudgetViews.records.transfers.create path="/transfers" />
          </BudgetViews.records.create>
        </Router>
        <UISnackbar />
      </div>
    </>
  )
}

export default Root
