import * as React from "react"
import TransactionFormsCreate from "~/components/Transaction/Forms/Create"
import { connect } from "react-redux"
import { StoreState } from "~/store"
import { StoreUIActionCreators } from "~/store/ui"
import { navigate } from "@reach/router"
import { Query, Mutation } from "react-apollo"
import gql from "graphql-tag"
import { CreateTransactionInput } from "~/types/Transaction"

// ---------------------------------------------------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------------------------------------------------
const BudgetsAccountsTransactionsCreate: React.SFC<
  BudgetsAccountsTransactionsCreateProps
> = props => {
  return (
    <BudgetsAccountsTransactionsCreateInitQuery
      query={BudgetsAccountsTransactionsCreateInitQuery.gql}
    >
      {res => {
        if (res.loading) return "Loading ..."
        if (res.error) return "Error"

        return (
          <BudgetsAccountsTransactionsCreateMutation
            mutation={BudgetsAccountsTransactionsCreateMutation.gql}
          >
            {createTransaction => (
              <TransactionFormsCreate
                accountId={props.accountId}
                categories={res.data.spendCategories}
                onSubmit={async values => {
                  await createTransaction({
                    variables: {
                      input: {
                        accountId: props.accountId,
                        amount: values.amount,
                        categoryId: values.category,
                        incoming: values.incoming,
                      },
                    },
                  })
                  props.openSnackbar(`Transaction saved`)
                  navigate(`/budgets/${props.budgetId || ""}`)
                }}
              />
            )}
          </BudgetsAccountsTransactionsCreateMutation>
        )
      }}
    </BudgetsAccountsTransactionsCreateInitQuery>
  )
}

// ---------------------------------------------------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------------------------------------------------
export class BudgetsAccountsTransactionsCreateInitQuery extends Query<
  {
    spendCategories: Array<{ id: string; name: string }>
  },
  {
    budgetId: string
  }
> {
  static gql = gql`
    query BudgetsAccountsTransactionsCreateInit {
      spendCategories {
        id
        name
      }
    }
  `
}

// ---------------------------------------------------------------------------------------------------------------------
// Mutations
// ---------------------------------------------------------------------------------------------------------------------
export class BudgetsAccountsTransactionsCreateMutation extends Mutation<
  {
    createTransaction: { id: string }
  },
  {
    input: CreateTransactionInput
  }
> {
  static gql = gql`
    mutation CreateTransaction($input: CreateTransactionInput) {
      createTransaction(input: $input) {
        id
      }
    }
  `
}

// ---------------------------------------------------------------------------------------------------------------------
// Redux Connection
// ---------------------------------------------------------------------------------------------------------------------
export interface BudgetsAccountsTransactionsCreateProps
  extends DispatchProps,
    OwnProps {}

interface DispatchProps {
  openSnackbar: (message: string) => void
}

interface OwnProps {
  path?: string
  accountId?: string
  budgetId?: string
}

export default connect<{}, DispatchProps, OwnProps, StoreState>(
  null,
  {
    openSnackbar: StoreUIActionCreators.openSnackbar,
  }
)(BudgetsAccountsTransactionsCreate)
