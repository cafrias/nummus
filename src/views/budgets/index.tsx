import Create from "./create"

import AccountsCreate from "./accounts/create"

const BudgetViews = {
  Create,
  accounts: {
    create: AccountsCreate,
  },
}

export default BudgetViews
