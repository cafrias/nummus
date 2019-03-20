import * as React from "react"
import AccountFormsCreate from "~/components/Account/Forms/Create"
import { StoreAccountCreateThunk, StoreAccountThunks } from "~/store/account"
import { connect } from "react-redux"
import { StoreState, SimpleThunkDispatch } from "~/store"
import { CreateAccountInput } from "~/services/AccountService"
import { StoreUIActionCreators } from "~/store/ui"
import { navigate } from "@reach/router"
import { DataErrors } from "~/errors/DataErrors"

// ---------------------------------------------------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------------------------------------------------
const BudgetsAccountsCreate: React.SFC<BudgetsAccountsCreateProps> = props => {
  return (
    <AccountFormsCreate
      onSubmit={async (values, form) => {
        try {
          const account = await props.createAccount({
            budgetId: props.budgetId || "",
            ...values,
          })
          props.openSnackbar(`Account '${account.name}' created successfully`)
          navigate(`/budgets/${props.budgetId}`)
        } catch (err) {
          switch (err.code) {
            case DataErrors.VALIDATION_ERROR:
              form.setErrors(err.errors)
              break
            default:
              throw err
          }
        }
      }}
    />
  )
}

// ---------------------------------------------------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------------------------------------------------
export interface BudgetsAccountsCreateProps
  extends StateProps,
    DispatchProps,
    OwnProps {}

interface StateProps {}

interface DispatchProps {
  createAccount: StoreAccountCreateThunk
  openSnackbar: (message: string) => void
}

interface OwnProps {
  path?: string
  budgetId?: string
}

// ---------------------------------------------------------------------------------------------------------------------
// Redux Connection
// ---------------------------------------------------------------------------------------------------------------------
export default connect<StateProps, DispatchProps, OwnProps, StoreState>(
  null,
  (dispatch: SimpleThunkDispatch) => ({
    createAccount: (input: CreateAccountInput) =>
      dispatch(StoreAccountThunks.create(input)),
    openSnackbar: (message: string) =>
      dispatch(StoreUIActionCreators.openSnackbar(message)),
  })
)(BudgetsAccountsCreate)
