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

// ---------------------------------------------------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------------------------------------------------
const BudgetsRecordsTransfersCreate: React.SFC<
  BudgetsRecordsTransfersCreateProps
> = props => {
  return (
    <BudgetsRecordsTransfersCreateInitQuery
      variables={{
        budgetId: props.budgetId,
      }}
      query={BudgetsRecordsTransfersCreateInitQuery.gql}
    >
      {res => {
        if (res.loading) return "Loading ..."
        if (res.error) return "Error"

        return (
          <BudgetsRecordsTransfersCreateMutation
            mutation={BudgetsRecordsTransfersCreateMutation.gql}
          >
            {createTransfer => (
              <TransferFormsCreate
                accounts={res.data.accounts}
                onSubmit={async values => {
                  await createTransfer({
                    variables: {
                      input: {
                        accountId: props.accountId,
                        amount: values.amount,
                        destination: values.destination,
                        incoming: values.incoming,
                      },
                    },
                  })
                  props.openSnackbar(`Transfer saved`)
                  navigate(`/budgets/${props.budgetId || ""}`)
                }}
              />
            )}
          </BudgetsRecordsTransfersCreateMutation>
        )
      }}
    </BudgetsRecordsTransfersCreateInitQuery>
  )
}

// ---------------------------------------------------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------------------------------------------------
export class BudgetsRecordsTransfersCreateInitQuery extends Query<
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
export class BudgetsRecordsTransfersCreateMutation extends Mutation<
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
export interface BudgetsRecordsTransfersCreateProps
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
)(BudgetsRecordsTransfersCreate)
