import * as React from "react"
import { ViewProps } from "../Root"

import classNames from "classnames"

import IconButton from "@material-ui/core/IconButton"
import Chip from "@material-ui/core/Chip"
import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import TableFooter from "@material-ui/core/TableFooter"
import Typography from "@material-ui/core/Typography"
import Fab from "@material-ui/core/Fab"

import AddIcon from "@material-ui/icons/Add"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

import green from "@material-ui/core/colors/green"
import grey from "@material-ui/core/colors/grey"
import red from "@material-ui/core/colors/red"

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
    hideXS: {
      [t.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    available: {
      width: "100%",
      fontWeight: "bold",
      fontSize: "1.05rem",
    },
    surplus: {
      backgroundColor: green[600],
      color: t.palette.getContrastText(green[600]),
    },
    deficit: {
      backgroundColor: red[400],
      color: t.palette.getContrastText(red[400]),
    },
    check: {
      backgroundColor: grey[200],
      color: t.palette.getContrastText(grey[200]),
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
      <ExpansionPanel defaultExpanded={true}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography component="h2" variant="h6">
            Immediate Obligations
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell align="right" className={classes.hideXS}>
                  Budgeted
                </TableCell>
                <TableCell align="right" className={classes.hideXS}>
                  Spent
                </TableCell>
                <TableCell align="center">Available</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Internet</TableCell>
                <TableCell align="right" className={classes.hideXS}>
                  250
                </TableCell>
                <TableCell align="right" className={classes.hideXS}>
                  300
                </TableCell>
                <TableCell>
                  <Chip
                    className={classNames(classes.available, classes.deficit)}
                    label="-50"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Gas</TableCell>
                <TableCell align="right" className={classes.hideXS}>
                  800
                </TableCell>
                <TableCell align="right" className={classes.hideXS}>
                  0
                </TableCell>
                <TableCell>
                  <Chip
                    className={classNames(classes.available, classes.surplus)}
                    label="800"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Rent</TableCell>
                <TableCell align="right" className={classes.hideXS}>
                  1200
                </TableCell>
                <TableCell align="right" className={classes.hideXS}>
                  1200
                </TableCell>
                <TableCell>
                  <Chip
                    className={classNames(classes.available, classes.check)}
                    label="0"
                  />
                </TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell />
                <TableCell className={classes.hideXS} />
                <TableCell className={classes.hideXS} />
                <TableCell align="center">
                  <IconButton color="default">
                    <AddIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </ExpansionPanelDetails>
      </ExpansionPanel>
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
