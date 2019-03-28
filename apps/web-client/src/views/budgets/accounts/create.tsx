import * as React from "react"
import AccountFormsCreate from "~/components/Account/Forms/Create"
import { connect } from "react-redux"
import { StoreState } from "~/store"
import { StoreUIActionCreators } from "~/store/ui"
import { navigate } from "@reach/router"
import { Mutation } from "react-apollo"
import gql from "graphql-tag"
import { CreateAccountInput } from "~/types/Account"
import { marshalMoney } from "~/utils/moneyMarshaler"

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
                  initialBalance: marshalMoney(values.initialBalance),
                  budgetId: props.budgetId,
                  name: values.name,
                  type: values.type,
                },
              },
            })
            props.openSnackbar("Account created")
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
export interface BudgetsAccountsCreateProps extends DispatchProps, OwnProps {}

interface DispatchProps {
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
export default connect<{}, DispatchProps, OwnProps, StoreState>(
  null,
  {
    openSnackbar: StoreUIActionCreators.openSnackbar,
  }
)(BudgetsAccountsCreate)
