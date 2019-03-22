import { NormalizedTree } from "~/models/NormalizedTree"
import { AccountNormalized, AccountType } from "~/models/Account"

const dataDebugAccount: NormalizedTree<AccountNormalized> = {
  "1": {
    id: "1",
    budget: "1",
    transactions: [],
    initialBalance: 0,
    name: "My bank account",
    type: AccountType.Bank,
  },
}

export default dataDebugAccount
