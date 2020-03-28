import Entity from "./Entity"
import SpendCategory from "./SpendCategory"
import Transfer from "./Transfer"

export default class Transaction extends Entity {
  constructor(
    id: string,
    private account: Account,
    private incoming: boolean,
    private category: SpendCategory,
    private amount: number,
    private transfer?: Transfer
  ) {
    super(id)
  }

  public getAccount() {
    return this.account
  }

  public isIncoming() {
    return this.incoming
  }

  public getAmount() {
    return this.amount
  }

  public getCategory() {
    return this.category
  }

  public getTransfer() {
    return this.transfer
  }

  public setTransfer(transfer: Transfer) {
    this.transfer = transfer
  }
}
