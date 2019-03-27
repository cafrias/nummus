import * as React from "react"
import TransactionFormsCreate, {
  GroupedCategories,
} from "~/components/Transaction/Forms/Create"
import { connect } from "react-redux"
import { StoreState } from "~/store"
import { StoreUIActionCreators } from "~/store/ui"
import { navigate } from "@reach/router"
import { Query, Mutation } from "react-apollo"
import gql from "graphql-tag"
import { CreateTransactionInput } from "~/types/Transaction"
import { SpendGroup, SpendCategory } from "@nummus/schema"
import { IdName } from "~/types/IdLabel"

// ---------------------------------------------------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------------------------------------------------
const BudgetsRecordsTransactionsCreate: React.SFC<
  BudgetsRecordsTransactionsCreateProps
> = props => {
  return (
    <BudgetsRecordsTransactionsCreateInitQuery
      variables={{
        budgetId: props.budgetId,
      }}
      query={BudgetsRecordsTransactionsCreateInitQuery.gql}
    >
      {res => {
        if (res.loading) return "Loading ..."
        if (res.error) return "Error"

        // FIXME: grouping in each update
        const groupedCategories = groupCategories(res.data.spendCategories)

        return (
          <BudgetsRecordsTransactionsCreateMutation
            mutation={BudgetsRecordsTransactionsCreateMutation.gql}
          >
            {createTransaction => (
              <TransactionFormsCreate
                accounts={res.data.accounts}
                categories={groupedCategories}
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
          </BudgetsRecordsTransactionsCreateMutation>
        )
      }}
    </BudgetsRecordsTransactionsCreateInitQuery>
  )
}

// ---------------------------------------------------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------------------------------------------------
function groupCategories(categories: SpendCategory[]) {
  return categories.reduce<GroupedCategories>(
    (res, cat) => {
      res[cat.group].push(cat)
      return res
    },
    {
      [SpendGroup.ImmediateObligations]: [],
      [SpendGroup.TrueExpenses]: [],
    }
  )
}

// ---------------------------------------------------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------------------------------------------------
export class BudgetsRecordsTransactionsCreateInitQuery extends Query<
  {
    spendCategories: SpendCategory[]
    accounts: IdName[]
  },
  {
    budgetId: string
  }
> {
  static gql = gql`
    query BudgetsRecordsTransactionsCreateInit($budgetId: ID!) {
      spendCategories {
        id
        name
        group
      }
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
export class BudgetsRecordsTransactionsCreateMutation extends Mutation<
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
export interface BudgetsRecordsTransactionsCreateProps
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
)(BudgetsRecordsTransactionsCreate)
