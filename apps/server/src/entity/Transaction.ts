import { Entity, ManyToOne } from "typeorm"
import { Record } from "./Record"
import { SpendCategory } from "./SpendCategory"

@Entity()
export class Transaction extends Record {
  @ManyToOne(type => SpendCategory)
  category: SpendCategory

  constructor(input?: Partial<Transaction>) {
    super()

    for (const key in input) {
      if (input.hasOwnProperty(key)) {
        this[key] = input[key]
      }
    }
  }
}
