import { Budget } from "./Budget"
import { SpendGroup } from "./SpendGroup"

export interface SpendCategory {
  id: string

  budget: Budget
  name: string
  group: SpendGroup
}
