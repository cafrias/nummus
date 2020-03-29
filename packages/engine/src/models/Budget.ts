import Entity from "./Entity"
import User from "./User"
import Currency from "./Currency"

/**
 * Represents a budget
 */
export default class Budget extends Entity {
  constructor(
    id: string,
    private name: string,
    private user: User,
    private currency: Currency,
    private accounts: Account[] = []
  ) {
    super(id)
  }

  public getName() {
    return this.name
  }

  public getUser() {
    return this.user
  }

  public getCurrency() {
    return this.currency
  }

  public getAccounts() {
    return this.accounts
  }
}
