import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm"
import { Budget } from "./Budget"
import { Record } from "./Record"
import { AccountType, AccountResolvers } from "@nummus/schema"
import { Context } from ".."

// ---------------------------------------------------------------------------------------------------------------------
// Entity
// ---------------------------------------------------------------------------------------------------------------------
@Entity()
export class Account {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  type: AccountType

  @Column()
  name: string

  @Column("int")
  initialBalance: number

  @ManyToOne(type => Budget, budget => budget.accounts)
  budget: Budget

  @OneToMany(type => Record, record => record.account)
  records: Record[]

  constructor(input?: Partial<Account>) {
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
export const AccountResolver: AccountResolvers<Context> = {
  records(account, _, { orm }) {
    return orm
      .getRepository(Record)
      .find({ where: { account: { id: account.id } } })
  },
  budget(account, _, { orm }) {
    return orm.getRepository(Budget).findOneOrFail(account.budget)
  },
}
