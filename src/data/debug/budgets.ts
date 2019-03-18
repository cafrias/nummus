import { NormalizedTree } from "~/models/NormalizedTree"
import { BudgetNormalized } from "~/models/Budget"
import dataDebugCurrencies from "./currency"
import dataDebugUser from "./user"

const dataDebugBudgets: NormalizedTree<BudgetNormalized> = {
  "1": {
    id: "1",
    currency: dataDebugCurrencies.ARS.code,
    name: "My first budget",
    user: dataDebugUser.id,
  },
}

export default dataDebugBudgets
