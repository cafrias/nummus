import Entity from "./Entity"
import Budget from "./Budget"

/**
 * Represents a user of the application
 */
export default class User extends Entity {
  constructor(id: string, private budgets: Budget[] = []) {
    super(id)
  }

  public getBudgets() {
    return this.budgets
  }
}
