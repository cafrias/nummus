import { Budget } from "~/models/Budget"
import { User } from "~/models/User"
import { Currency } from "~/models/Currency"
import { SpendCategory } from "~/models/SpendCategory"

interface CreateBudgetInput {
  user: User
  name: string
  currency: Currency
  category: SpendCategory
}

export default class BudgetService {
  public async create(input: CreateBudgetInput): Promise<Budget> {
    // TODO: implement
    return {
      id: "" + Math.random() * 100,
      ...input,
    }
  }
}
