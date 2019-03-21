import Create from "./create"

import AccountsCreate from "./accounts/create"
import AccountsTransactionsCreate from "./accounts/transactions/create"

const BudgetViews = {
  Create,
  accounts: {
    create: AccountsCreate,
    transactions: {
      create: AccountsTransactionsCreate,
    },
  },
}

export default BudgetViews
