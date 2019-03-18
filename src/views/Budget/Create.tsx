import * as React from "react"
import { connect } from "react-redux"

import { Currency } from "~/models/Currency"
import { StoreState, SimpleThunkDispatch } from "~/store"
import { StoreCurrencySelectors } from "~/store/currency"
import { StoreBudgetThunks, StoreBudgetCreateThunk } from "~/store/budget"
import dataDebugUser from "~/data/debug/user"
import BudgetFormsCreate from "~/components/Budget/Forms/Create"
import { DataErrors } from "~/errors/DataErrors"
import { CreateBudgetInput } from "~/services/BudgetService"
import { makeStyles, createStyles } from "@material-ui/styles"

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

  return (
    <div className={classes.container}>
      <BudgetFormsCreate
        currencies={currencies}
        onSubmit={async (values, actions) => {
          try {
            const result = await createBudget({
              userId: dataDebugUser.id,
              currencyCode: values.currency,
              name: values.name,
            })

            // TODO: Redirect to next view
          } catch (err) {
            switch (err.code) {
              case DataErrors.VALIDATION_ERROR:
                actions.setErrors(err.errors)
              default:
                console.error(err)
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
}

interface OwnProps {}

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
