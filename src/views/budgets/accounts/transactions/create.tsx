import * as React from "react"
import TransactionFormsCreate, { TransactionFormsCreateProps, TransactionFormsCreateValues } from "~/components/Transaction/Forms/Create"
import { Account } from "~/models/Account"
import { SpendCategory } from "~/models/SpendCategory";
import { StoreTransactionCreateThunk, StoreTransactionThunks } from "~/store/transaction";
import { connect } from "react-redux";
import { StoreAccountSelectors } from "~/store/account";
import { StoreSpendCategorySelectors } from "~/store/spendCategory";
import { StoreState, SimpleThunkDispatch } from "~/store";
import UIFormsCreate from "~/components/UI/Forms/Create";
import { CreateTransactionInput } from "~/services/TransactionService";
import { StoreUIActionCreators } from "~/store/ui";
import { navigate } from "@reach/router";


// ---------------------------------------------------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------------------------------------------------
const BudgetsAccountsTransactionsCreate: React.SFC<
  BudgetsAccountsTransactionsCreateProps
> = props => {
  return UIFormsCreate<TransactionFormsCreateProps, TransactionFormsCreateValues>({
    FormProps: {
      accountId: props.accountId || "",
      categories: props.categories,
      accounts: props.accounts
    },
    component: TransactionFormsCreate,
    async create(values) {
      await props.createTransaction({
        amount: values.amount,
        category: values.category,
        from: values.incoming ? values.account : props.accountId,
        to: values.incoming ? props.accountId : values.account
      })
      props.openSnackbar(`Transaction saved`)
      navigate(`/budgets/${props.budgetId || ''}`)
    }
  })
}

// ---------------------------------------------------------------------------------------------------------------------
// Redux Connection
// ---------------------------------------------------------------------------------------------------------------------
export interface BudgetsAccountsTransactionsCreateProps extends StateProps, DispatchProps, OwnProps {
  
}
interface StateProps {
  accounts: Account[],
  categories: SpendCategory[]
}

interface DispatchProps {
  createTransaction: StoreTransactionCreateThunk
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
    categories: StoreSpendCategorySelectors.getAll(state)
  }),
  (dispatch: SimpleThunkDispatch) => ({
    createTransaction: (input: CreateTransactionInput) =>
      dispatch(StoreTransactionThunks.create(input)),
    openSnackbar: (message: string) =>
      dispatch(StoreUIActionCreators.openSnackbar(message)),
  })
)(BudgetsAccountsTransactionsCreate)

