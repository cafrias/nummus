import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { SpendGroup } from "schema"

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
