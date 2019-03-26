import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

/**
 * `SpendGroup` groups a number of `SpendCategories`, it's meant to give them some context, you won't attach a `Transaction`
 * directly to a `SpendGroup`, you do that to `SpendCategories` instead. Example:
 *
 * > __Immediate Obligations__ is a `SpendGroup` that groups `SpendCategories` like _Rent/Mortgage_, _Electric_, and _Internet_.
 */
export enum SpendGroup {
  ImmediateObligations = "IMMEDIATE_OBLIGATIONS",
}

@Entity()
export class SpendCategory {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  name: string

  @Column()
  group: SpendGroup

  constructor(input?: SpendCategoryInput) {
    if (input) {
      this.name = input.name
      this.group = input.group
    }
  }
}

interface SpendCategoryInput {
  name: string
  group: SpendGroup
}
