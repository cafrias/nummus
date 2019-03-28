import * as React from "react"
import { ViewProps } from "../Root"

import Fab from "@material-ui/core/Fab"
import AddIcon from "@material-ui/icons/Add"

import { makeStyles, createStyles } from "@material-ui/styles"
import { Theme } from "@material-ui/core/styles"
import { Link } from "@reach/router"

// ---------------------------------------------------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------------------------------------------------
const useStyles = makeStyles((t: Theme) =>
  createStyles({
    fab: {
      position: "fixed",
      bottom: `${t.spacing.unit * 2}px`,
      right: `${t.spacing.unit * 2}px`,
    },
  })
)

// ---------------------------------------------------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------------------------------------------------
export interface BudgetsShowProps extends ViewProps {
  budgetId?: string
}

// ---------------------------------------------------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------------------------------------------------
const BudgetsShow: React.SFC<BudgetsShowProps> = props => {
  const classes = useStyles()

  return (
    <main>
      <Fab
        className={classes.fab}
        color="primary"
        aria-label="New transaction"
        title="New transaction"
        component={Link}
        {...{ to: "records/create/transaction" }}
      >
        <AddIcon />
      </Fab>
    </main>
  )
}

export default BudgetsShow
