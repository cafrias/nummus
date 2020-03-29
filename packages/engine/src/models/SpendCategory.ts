import Entity from "./Entity"
import { SpendGroup } from "./SpendGroup"

export default class SpendCategory extends Entity {
  constructor(id: string, private name: string, private group: SpendGroup) {
    super(id)
  }

  public getName() {
    return this.name
  }

  public getGroup() {
    this.group
  }
}
