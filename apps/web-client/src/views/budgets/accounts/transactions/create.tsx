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

        // FIXME: grouping in each update
        const groupedCategories = groupCategories(res.data.spendCategories)

        return (
          <BudgetsAccountsTransactionsCreateMutation
            mutation={BudgetsAccountsTransactionsCreateMutation.gql}
          >
            {createTransaction => (
              <TransactionFormsCreate
                accountId={props.accountId}
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
          </BudgetsAccountsTransactionsCreateMutation>
        )
      }}
    </BudgetsAccountsTransactionsCreateInitQuery>
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
export class BudgetsAccountsTransactionsCreateInitQuery extends Query<
  {
    spendCategories: SpendCategory[]
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
        group
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
