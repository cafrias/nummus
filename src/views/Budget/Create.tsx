import * as React from "react"
import { connect } from "react-redux"

import { Currency } from "~/models/Currency"
import { StoreState, SimpleThunkDispatch } from "~/store"
import { StoreCurrencySelectors } from "~/store/currency"
import { StoreBudgetThunks, StoreBudgetCreateThunk } from "~/store/budget"
import BudgetFormsCreate from "~/components/Budget/Forms/Create"
import { DataErrors } from "~/errors/DataErrors"
import { CreateBudgetInput } from "~/services/BudgetService"

// MUI
import Snackbar from "@material-ui/core/Snackbar"
import IconButton from "@material-ui/core/IconButton"

import { makeStyles, createStyles } from "@material-ui/styles"

import CloseIcon from "@material-ui/icons/Close"

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
// Component
// ---------------------------------------------------------------------------------------------------------------------
const BudgetCreate: React.SFC<BudgetCreateProps> = ({
  currencies,
  createBudget,
}) => {
  const classes = useStyles()

  const [snackbar, setSnackbar] = React.useState({ text: "", open: false })

  return (
    <div className={classes.container}>
      <BudgetFormsCreate
        currencies={currencies}
        onSubmit={async (values, actions) => {
          try {
            const result = await createBudget({
              userId: "1",
              currencyCode: values.currency,
              name: values.name,
            })

            setSnackbar({
              open: true,
              text: `Budget '${result.name}' created successfully`,
            })

            // TODO: Redirect to next view
          } catch (err) {
            switch (err.code) {
              case DataErrors.VALIDATION_ERROR:
                actions.setErrors(err.errors)
                break
              default:
                throw err
            }
          }
        }}
      />
      <Snackbar
        open={snackbar.open}
        message={snackbar.text}
        action={
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => setSnackbar({ ...snackbar, open: false })}
          >
            <CloseIcon />
          </IconButton>
        }
      />
    </div>
  )
}

// ---------------------------------------------------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------------------------------------------------
export interface BudgetCreateProps
  extends StateProps,
    DispatchProps,
    OwnProps {}

interface StateProps {
  currencies: Currency[]
}

interface DispatchProps {
  createBudget: StoreBudgetCreateThunk
}

interface OwnProps {
  path?: string
}

// ---------------------------------------------------------------------------------------------------------------------
// Redux Connection
// ---------------------------------------------------------------------------------------------------------------------
export default connect<StateProps, DispatchProps, OwnProps, StoreState>(
  state => ({
    currencies: StoreCurrencySelectors.getAll(state),
  }),
  (dispatch: SimpleThunkDispatch) => ({
    createBudget: (input: CreateBudgetInput) =>
      dispatch(StoreBudgetThunks.create(input)),
  })
)(BudgetCreate)
