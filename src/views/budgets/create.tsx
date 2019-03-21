import * as React from "react"
import { connect } from "react-redux"

import { Currency } from "~/models/Currency"
import { StoreState, SimpleThunkDispatch } from "~/store"
import { StoreCurrencySelectors } from "~/store/currency"
import { StoreBudgetThunks, StoreBudgetCreateThunk } from "~/store/budget"
import BudgetFormsCreate, {
  BudgetFormsCreateProps,
  BudgetFormsCreateValues,
} from "~/components/Budget/Forms/Create"
import { CreateBudgetInput } from "~/services/BudgetService"

import { navigate } from "@reach/router"
import { StoreUIActionCreators } from "~/store/ui"
import UIFormsCreate from "~/components/UI/Forms/Create"

// ---------------------------------------------------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------------------------------------------------
const BudgetCreate: React.SFC<BudgetCreateProps> = ({
  currencies,
  createBudget,
  openSnackbar,
}) => {
  return UIFormsCreate<BudgetFormsCreateProps, BudgetFormsCreateValues>({
    async create(values) {
      const result = await createBudget({
        userId: "1",
        currencyCode: values.currency,
        name: values.name,
      })

      openSnackbar(`Budget '${result.name}' created successfully`)

      navigate(`/budgets/${result.id}/accounts/create`)
    },
    FormProps: {
      currencies,
    },
    component: BudgetFormsCreate,
  })
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
