import Create from "./create"

import AccountsCreate from "./accounts/create"
import RecordsCreate from "./records/create"

const BudgetViews = {
  Create,
  accounts: {
    create: AccountsCreate,
  },
  records: {
    create: RecordsCreate,
  },
}

export default BudgetViews
