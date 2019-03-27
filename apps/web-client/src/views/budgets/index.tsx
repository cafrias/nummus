import Create from "./create"

import AccountsCreate from "./accounts/create"

import RecordsCreate from "./records/create"
import TransactionsCreate from "./records/transactions/create"
import TransfersCreate from "./records/transfers/create"

const BudgetViews = {
  Create,
  accounts: {
    create: AccountsCreate,
  },
  records: {
    create: RecordsCreate,
    transactions: {
      create: TransactionsCreate,
    },
    transfers: {
      create: TransfersCreate,
    },
  },
}

export default BudgetViews
