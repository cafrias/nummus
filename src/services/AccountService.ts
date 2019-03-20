import uuidv4 from "uuid/v4"

import { Account, AccountType } from "~/models/Account"

export interface CreateAccountInput {
  type: AccountType
  name: string
  budgetId: string
}

export default class AccountService {
  public async create(input: CreateAccountInput): Promise<Account> {
    // TODO: implement
    return {
      id: uuidv4(),
      budget: input.budgetId,
      inTransactions: [],
      outTransactions: [],
      initialBalance: 0,
      type: input.type,
      name: input.name,
    }
  }
}
