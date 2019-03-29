import * as React from "react"

import BottomNavigation from "@material-ui/core/BottomNavigation"
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction"

import { makeStyles, createStyles } from "@material-ui/styles"

import ImportExportIcon from "@material-ui/icons/ImportExport"
import MoneyIcon from "@material-ui/icons/Money"
import { Link } from "@reach/router"

import { ViewProps } from "~/views/Root"

// ---------------------------------------------------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------------------------------------------------
const useStyles = makeStyles(theme =>
  createStyles({
    bottomNavigation: {
      position: "fixed",
      bottom: 0,
      left: 0,
      width: "100%",
    },
  })
)

// ---------------------------------------------------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------------------------------------------------
const BudgetsRecordsCreate: React.SFC<ViewProps> = props => {
  const [tab, setTab] = React.useState(0)
  const classes = useStyles()

  return (
    <>
      {props.children}
      <BottomNavigation
        className={classes.bottomNavigation}
        value={tab}
        onChange={(e, newTab) => setTab(newTab)}
        showLabels
      >
        <BottomNavigationAction
          component={Link}
          {...{ to: "transaction" }}
          label="Transaction"
          icon={<MoneyIcon />}
        />
        <BottomNavigationAction
          component={Link}
          {...{ to: "transfer" }}
          label="Transfer"
          icon={<ImportExportIcon />}
        />
      </BottomNavigation>
    </>
  )
}

export default BudgetsRecordsCreate