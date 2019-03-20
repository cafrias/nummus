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
import { makeStyles, createStyles } from "@material-ui/styles"

import { navigate } from "@reach/router"
import { StoreUIActionCreators } from "~/store/ui"

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
  openSnackbar,
}) => {
  const classes = useStyles()

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

            openSnackbar(`Budget '${result.name}' created successfully`)

            navigate(`/budgets/${result.id}/accounts/create`)
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
  openSnackbar: (message: string) => void
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
    openSnackbar: (message: string) =>
      dispatch(StoreUIActionCreators.openSnackbar(message)),
  })
)(BudgetCreate)
