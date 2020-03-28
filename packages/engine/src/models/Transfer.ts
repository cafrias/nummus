import Entity from "./Entity"
import Transaction from "./Transaction"

/**
 * Represents a transfer between two accounts
 */
export default class Transfer extends Entity {
  constructor(
    id: string,
    private fromTransaction: Transaction,
    private toTransaction: Transaction
  ) {
    super(id)

    // TODO: validate both transactions should target different accounts

    fromTransaction.setTransfer(this)
    toTransaction.setTransfer(this)
  }

  public getFromTransaction() {
    return this.fromTransaction
  }

  public getToTransaction() {
    return this.toTransaction
  }
}
