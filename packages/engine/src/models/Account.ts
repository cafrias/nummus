import Entity from "./Entity"
import { AccountType } from "./AccountType"
import Budget from "./Budget"
import Transaction from "./Transaction"

export default class Account extends Entity {
  constructor(
    id: string,
    private type: AccountType,
    private name: string,
    private budget: Budget,
    private initialBalance: number = 0,
    private transactions: Transaction[] = []
  ) {
    super(id)
  }

  public getType() {
    return this.type
  }

  public getName() {
    return this.name
  }

  public getBudget() {
    return this.budget
  }

  public getInitialBalance() {
    return this.initialBalance
  }

  public getTransactions() {
    return this.transactions
  }
}
