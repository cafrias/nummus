import { NormalizedTree } from "~/models/NormalizedTree"
import { AccountNormalized, AccountType } from "~/models/Account"

const dataDebugAccount: NormalizedTree<AccountNormalized> = {
  "1": {
    id: "1",
    budget: "1",
    inTransactions: [],
    initialBalance: 0,
    outTransactions: [],
    name: "My bank account",
    type: AccountType.Bank,
  },
}

export default dataDebugAccount
