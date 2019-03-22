import * as React from "react"
import TransactionFormsCreate from "~/components/Transaction/Forms/Create"
import { AccountType } from "~/models/Account"

export interface BudgetsAccountsTransactionsCreateProps {
  path?: string
  accountId?: string
}

const BudgetsAccountsTransactionsCreate: React.SFC<
  BudgetsAccountsTransactionsCreateProps
> = props => {
  return (
    <TransactionFormsCreate
      accountId={props.accountId || ""}
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

export default BudgetsAccountsTransactionsCreate
