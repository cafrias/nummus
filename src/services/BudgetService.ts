import uuidv4 from "uuid/v4"

import { Budget } from "~/models/Budget"
import dataDebugCurrencies from "~/data/debug/currency"
import dataDebugUser from "~/data/debug/user"

export interface CreateBudgetInput {
  name: string
  currencyCode: string
  userId: string
}

export default class BudgetService {
  public async create(input: CreateBudgetInput): Promise<Budget> {
    // TODO: implement
    return {
      id: uuidv4(),
      currency: dataDebugCurrencies[input.currencyCode],
      name: input.name,
      user: dataDebugUser[input.userId],
      accounts: [],
    }
  }
}
