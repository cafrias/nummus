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

  @OneToMany(type => Account, account => account.budget)
  accounts: Account[]
}
