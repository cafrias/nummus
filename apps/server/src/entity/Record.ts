import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Account } from "./Account"

@Entity()
export abstract class Record {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column("unsigned big int")
  amount: number

  @Column()
  incoming: boolean

  @ManyToOne(type => Account, account => account.records)
  account: Account
}
