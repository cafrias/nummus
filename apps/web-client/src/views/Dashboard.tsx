import * as React from "react"

import { Link as RouterLink } from "@reach/router"

// MUI
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/styles"
import { Theme, createStyles } from "@material-ui/core/styles"

// ---------------------------------------------------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------------------------------------------------
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: `${theme.spacing.unit * 2}px`,
    },
  })
)

// ---------------------------------------------------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------------------------------------------------
export interface DashboardProps {
  path?: string
}

// ---------------------------------------------------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------------------------------------------------
const Dashboard: React.SFC<DashboardProps> = () => {
  const classes = useStyles()

  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} md={4}>
        <Button
          fullWidth
          variant="text"
          component={RouterLink}
          {...{ to: "/budgets/create" }}
        >
          Create budget
        </Button>
      </Grid>
      <Grid item xs={12} md={4}>
        <Button
          fullWidth
          variant="text"
          component={RouterLink}
          {...{ to: "/budgets/1/accounts/create" }}
        >
          Create account
        </Button>
      </Grid>
      <Grid item xs={12} md={4}>
        <Button
          fullWidth
          variant="text"
          component={RouterLink}
          {...{ to: "/budgets/1/records/create" }}
        >
          Create record
        </Button>
      </Grid>
    </Grid>
  )
}

export default Dashboard
