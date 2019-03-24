import * as React from "react"
import TransactionFormsCreate, {
  TransactionFormsCreateProps,
  TransactionFormsCreateValues,
} from "~/components/Transaction/Forms/Create"
import { Account } from "~/models/Account"
import { SpendCategory } from "~/models/SpendCategory"
import {
  StoreTransactionCreateThunk,
  StoreTransactionThunks,
} from "~/store/transaction"
import { connect } from "react-redux"
import { StoreAccountSelectors } from "~/store/account"
import { StoreSpendCategorySelectors } from "~/store/spendCategory"
import { StoreState, SimpleThunkDispatch } from "~/store"
import UIFormsCreate from "~/components/UI/Forms/Create"
import { StoreUIActionCreators } from "~/store/ui"
import { navigate } from "@reach/router"
import { Query, Mutation } from "react-apollo"
import gql from "graphql-tag"

import { CreateTransactionInput } from "~/models/Transaction"

// ---------------------------------------------------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------------------------------------------------
const BudgetsAccountsTransactionsCreate: React.SFC<
  BudgetsAccountsTransactionsCreateProps
> = props => {
  return (
    <BudgetsAccountsTransactionsCreateInitQuery>
      {res => {
        if (res.loading) return "Loading ..."
        if (res.error) return "Error"

        return (
          <TransactionFormsCreate
            accountId={props.accountId}
            categories={res.data.categories as SpendCategory[]}
            onSubmit={values => {
              // TODO: seguimos
              props.openSnackbar(`Transaction saved`)
              navigate(`/budgets/${props.budgetId || ""}`)
            }}
          />
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
    categories: Array<{ id: string; name: string }>
    accounts: Array<{ id: string; name: string }>
  },
  {
    budgetId: string
  }
> {
  static gql = gql`
    query BudgetsAccountsTransactionsCreateInit($budgetId: ID!) {
      spendCategories {
        id
        name
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
  extends StateProps,
    DispatchProps,
    OwnProps {}
interface StateProps {
  accounts: Account[]
  categories: SpendCategory[]
}

interface DispatchProps {
  openSnackbar: (message: string) => void
}

interface OwnProps {
  path?: string
  accountId?: string
  budgetId?: string
}

export default connect<StateProps, DispatchProps, OwnProps, StoreState>(
  state => ({
    accounts: StoreAccountSelectors.getAll(state),
    categories: StoreSpendCategorySelectors.getAll(state),
  }),
  {
    openSnackbar: StoreUIActionCreators.openSnackbar,
  }
)(BudgetsAccountsTransactionsCreate)
