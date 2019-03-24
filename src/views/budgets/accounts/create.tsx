import * as React from "react"
import AccountFormsCreate from "~/components/Account/Forms/Create"
import { StoreAccountCreateThunk, StoreAccountThunks } from "~/store/account"
import { connect } from "react-redux"
import { StoreState, SimpleThunkDispatch } from "~/store"
import { CreateAccountInput } from "~/services/AccountService"
import { StoreUIActionCreators } from "~/store/ui"
import { navigate } from "@reach/router"
import { Mutation } from "react-apollo"
import gql from "graphql-tag"

// ---------------------------------------------------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------------------------------------------------
const BudgetsAccountsCreate: React.SFC<BudgetsAccountsCreateProps> = props => {
  return (
    <BudgetsAccountsCreateMutation mutation={BudgetsAccountsCreateMutation.gql}>
      {createAccount => (
        <AccountFormsCreate
          onSubmit={async values => {
            await createAccount({
              variables: {
                input: {
                  budgetId: props.budgetId,
                  name: values.name,
                  type: values.type,
                },
              },
            })
            props.openSnackbar(`Account '${values.name}' created successfully`)
            navigate(`/budgets/${props.budgetId}`)
          }}
        />
      )}
    </BudgetsAccountsCreateMutation>
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
// Mutations
// ---------------------------------------------------------------------------------------------------------------------
export class BudgetsAccountsCreateMutation extends Mutation<
  {
    createAccount: { id: string }
  },
  {
    input: CreateAccountInput
  }
> {
  static gql = gql`
    mutation CreateAccount($input: CreateAccountInput) {
      createAccount(input: $input) {
        id
      }
    }
  `
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
