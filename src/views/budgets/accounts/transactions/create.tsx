import * as React from "react"
import TransactionFormsCreate from "~/components/Transaction/Forms/Create"
import { AccountType, Account } from "~/models/Account"
import { SpendGroup } from "~/models/SpendGroup"
import { SpendCategory } from "~/models/SpendCategory";
import { StoreTransactionCreateThunk } from "~/store/transaction";
import { connect } from "react-redux";
import { StoreCurrencySelectors } from "~/store/account";


// ---------------------------------------------------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------------------------------------------------
const BudgetsAccountsTransactionsCreate: React.SFC<
  BudgetsAccountsTransactionsCreateProps
> = props => {
  return (
    <TransactionFormsCreate
      accountId={props.accountId || ""}
      categories={[
        {
          budget: "1",
          group: SpendGroup.ImmediateObligations,
          id: "1",
          name: "Rent",
        },
      ]}
      accounts={[
        {
          budget: "1",
          id: "1",
          transactions: [],
          initialBalance: 0,
          name: "My first one",
          type: AccountType.Cash,
        },
        {
          budget: "1",
          id: "2",
          transactions: [],
          initialBalance: 0,
          name: "My second one",
          type: AccountType.CreditCard,
        },
      ]}
      onSubmit={async v => console.log(v)}
    />
  )
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
}

interface OwnProps {
  path?: string
  accountId?: string
}

export default connect<StateProps, DispatchProps, OwnProps, State>(
  state => ({
    accounts: StoreCurrencySelectors.getAll,
    categories: 
  }),
  // dispatch => ({
  //   : bindActionCreators(, dispatch),
  // })
)(BudgetsAccountsTransactionsCreate)

export default BudgetsAccountsTransactionsCreate
