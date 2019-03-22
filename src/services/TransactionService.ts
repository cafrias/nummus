import uuidv4 from "uuid/v4"

import { Transaction } from "~/models/Transaction"
import dataDebugCurrencies from "~/data/debug/currency"
import dataDebugUser from "~/data/debug/user"
import dataDebugSpendCategory from "~/data/debug/spendCategory"
import { Account } from "~/models/Account"

export interface CreateTransactionInput {
  /**
   * ID of the origin `Account` if existing
   */
  from?: string

  /**
   * ID of the destination `Account` if existing
   */
  to?: string

  /**
   * The ID of the `SpendCategory` this transaction belongs to
   */
  category: string

  amount: number
}

export default class TransactionService {
  public async create(input: CreateTransactionInput): Promise<Transaction[]> {
    // TODO: implement
    // It should verify if it requires to create more than one transaction for each account.
    return [
      {
        id: uuidv4(),
        amount: input.amount,
        category: dataDebugSpendCategory[input.category],
        account: "1",
        incoming: false,
      },
    ]
  }
}
