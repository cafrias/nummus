import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm"
import { Budget } from "./Budget"
import { Record } from "./Record"
import { AccountType } from "schema"

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
}
