import * as React from "react"

import BottomNavigation from "@material-ui/core/BottomNavigation"
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction"

import { makeStyles, createStyles } from "@material-ui/styles"

import ImportExportIcon from "@material-ui/icons/ImportExport"
import MoneyIcon from "@material-ui/icons/Money"
import { Link } from "@reach/router"

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

export interface BudgetsRecordsCreateProps {
  path?: string
}

const BudgetsRecordsCreate: React.SFC<BudgetsRecordsCreateProps> = props => {
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
          {...{ to: "" }}
          label="Transaction"
          icon={<MoneyIcon />}
        />
        <BottomNavigationAction
          component={Link}
          {...{ to: "transfers" }}
          label="Transfer"
          icon={<ImportExportIcon />}
        />
      </BottomNavigation>
    </>
  )
}

export default BudgetsRecordsCreate
