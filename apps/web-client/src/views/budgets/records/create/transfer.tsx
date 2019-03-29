import * as React from "react"
import { connect } from "react-redux"
import { StoreState } from "~/store"
import { StoreUIActionCreators } from "~/store/ui"
import { navigate } from "@reach/router"
import { Query, Mutation } from "react-apollo"
import gql from "graphql-tag"
import { SpendCategory, CreateTransferInput } from "@nummus/schema"
import { IdName } from "~/types/IdLabel"
import TransferFormsCreate from "~/components/Transfer/Forms/Create"
import { marshalMoney } from "~/utils/moneyMarshaler"

// ---------------------------------------------------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------------------------------------------------
const BudgetsRecordsCreateTransfer: React.SFC<
  BudgetsRecordsCreateTransferProps
> = props => {
  return (
    <BudgetsRecordsCreateTransferInitQuery
      variables={{
        budgetId: props.budgetId,
      }}
      query={BudgetsRecordsCreateTransferInitQuery.gql}
    >
      {res => {
        if (res.loading) return "Loading ..."
        if (res.error) return "Error"

        return (
          <BudgetsRecordsCreateTransferMutation
            mutation={BudgetsRecordsCreateTransferMutation.gql}
          >
            {createTransfer => (
              <TransferFormsCreate
                accounts={res.data.accounts}
                onSubmit={async values => {
                  await createTransfer({
                    variables: {
                      input: {
                        origin: values.account,
                        amount: marshalMoney(values.amount),
                        destination: values.destination,
                      },
                    },
                  })
                  props.openSnackbar(`Transfer saved`)
                  navigate(`/budgets/${props.budgetId || ""}`)
                }}
              />
            )}
          </BudgetsRecordsCreateTransferMutation>
        )
      }}
    </BudgetsRecordsCreateTransferInitQuery>
  )
}

// ---------------------------------------------------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------------------------------------------------
export class BudgetsRecordsCreateTransferInitQuery extends Query<
  {
    spendCategories: SpendCategory[]
    accounts: IdName[]
  },
  {
    budgetId: string
  }
> {
  static gql = gql`
    query BudgetsRecordsTransferCreateInit($budgetId: ID!) {
      accounts(budgetId: $budgetId) {
        id
        name
      }
    }
  `
}

// ---------------------------------------------------------------------------------------------------------------------
// Mutations
// ---------------------------------------------------------------------------------------------------------------------
export class BudgetsRecordsCreateTransferMutation extends Mutation<
  {
    createTransfer: { id: string }
  },
  {
    input: CreateTransferInput
  }
> {
  static gql = gql`
    mutation CreateTransaction($input: CreateTransferInput) {
      createTransfer(input: $input) {
        origin {
          id
        }
        destination {
          id
        }
      }
    }
  `
}

// ---------------------------------------------------------------------------------------------------------------------
// Redux Connection
// ---------------------------------------------------------------------------------------------------------------------
export interface BudgetsRecordsCreateTransferProps
  extends DispatchProps,
    OwnProps {}

interface DispatchProps {
  openSnackbar: (message: string) => void
}

interface OwnProps {
  path?: string
  budgetId?: string
}

export default connect<{}, DispatchProps, OwnProps, StoreState>(
  null,
  {
    openSnackbar: StoreUIActionCreators.openSnackbar,
  }
)(BudgetsRecordsCreateTransfer)
