import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  TableInheritance,
} from "typeorm"
import { Account } from "./Account"
import { RecordType } from "@nummus/schema"

@Entity()
@TableInheritance({ column: { name: "type" } })
export abstract class Record {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column("varchar")
  type: RecordType

  @Column("unsigned big int")
  amount: number

  @Column()
  incoming: boolean

  @ManyToOne(type => Account, account => account.records)
  account: Account
}
