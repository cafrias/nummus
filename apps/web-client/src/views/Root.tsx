import * as React from "react"

import { Router } from "@reach/router"

// Components
import UISnackbar from "~/components/UI/Snackbar"

// MUI
import { makeStyles, createStyles } from "@material-ui/styles"

// Routes
import Dashboard from "./Dashboard"

import Budgets from "./budgets"
import BudgetsCreate from "./budgets/create"
import BudgetsAccountsCreate from "./budgets/accounts/create"
import BudgetsRecords from "./budgets/records"
import BudgetsRecordsCreate from "./budgets/records/create"
import BudgetsRecordsCreateTransaction from "./budgets/records/create/transaction"
import BudgetsRecordsCreateTransfer from "./budgets/records/create/transfer"

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
export interface ViewProps {
  path?: string
}

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

          <Budgets path="/budgets">
            <BudgetsCreate path="/create" />
            {/* <BudgetViews.show path="/:budgetId" /> */}
            <BudgetsAccountsCreate path="/:budgetId/accounts/create" />
            <BudgetsRecords path="/:budgetId/records/create">
              <BudgetsRecordsCreate path="/create">
                <BudgetsRecordsCreateTransaction path="/" />
                <BudgetsRecordsCreateTransaction path="/transactions" />
                <BudgetsRecordsCreateTransfer path="/transfers" />
              </BudgetsRecordsCreate>
            </BudgetsRecords>
          </Budgets>
        </Router>
        <UISnackbar />
      </div>
    </>
  )
}

export default Root
