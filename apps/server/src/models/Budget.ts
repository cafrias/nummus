import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm"
import { User } from "./User"
import { Currency } from "./Currency"
import { Account } from "./Account"
import { BudgetResolvers } from "@nummus/schema"
import { Context } from ".."
import { SpendCategory } from "./SpendCategory"

// ---------------------------------------------------------------------------------------------------------------------
// Entity
// ---------------------------------------------------------------------------------------------------------------------
@Entity()
export class Budget {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  name: string

  @ManyToOne(type => User, user => user.budgets)
  user: User

  @ManyToOne(type => Currency)
  currency: Currency

  @Column("int", {
    default: 0,
  })
  toBeBudgeted: number

  @OneToMany(type => Account, account => account.budget)
  accounts: Account[]

  @OneToMany(_ => SpendCategory, category => category.budget)
  categories: SpendCategory[]

  constructor(input?: Partial<Budget>) {
    if (input) {
      for (const key in input) {
        if (input.hasOwnProperty(key)) {
          this[key] = input[key]
        }
      }
    }
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// Resolver
// ---------------------------------------------------------------------------------------------------------------------
export const BudgetResolver: BudgetResolvers<Context> = {
  accounts(budget, _, { orm }) {
    return orm
      .getRepository(Account)
      .find({ where: { budget: { id: budget.id } } })
  },
  categories(budget, _, { orm }) {
    return orm
      .getRepository(SpendCategory)
      .find({ where: { budget: { id: budget.id } } })
  },
  currency(budget, _, { orm }) {
    return orm.getRepository(Currency).findOneOrFail(budget.currency)
  },
  user(budget, _, { orm }) {
    return orm.getRepository(User).findOneOrFail(budget.user)
  },
}
