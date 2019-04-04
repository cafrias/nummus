import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm"
import { SpendGroup, SpendCategoryResolvers } from "@nummus/schema"
import { Budget } from "./Budget"
import { Context } from ".."
import { Transaction } from "./Transaction"

// ---------------------------------------------------------------------------------------------------------------------
// Entity
// ---------------------------------------------------------------------------------------------------------------------
@Entity()
export class SpendCategory {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  name: string

  @Column()
  group: SpendGroup

  @ManyToOne(_ => Budget, budget => budget.id)
  budget!: Budget

  @Column({
    default: 0,
  })
  budgeted!: number

  @Column({
    default: 0,
  })
  spent: number

  @OneToMany(_ => Transaction, transaction => transaction.category)
  transactions: Transaction[]

  constructor(input?: Partial<SpendCategory>) {
    for (const key in input) {
      if (input.hasOwnProperty(key)) {
        this[key] = input[key]
      }
    }
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// Resolver
// ---------------------------------------------------------------------------------------------------------------------
export const SpendCategoryResolver: SpendCategoryResolvers<Context> = {
  budget(category, _, { orm }) {
    return orm
      .getRepository(Budget)
      .findOneOrFail({ where: { id: category.budget } })
  },
  transactions(category, _, { orm }) {
    return orm
      .getRepository(Transaction)
      .find({ where: { category: { id: category.id } } })
  },
}
