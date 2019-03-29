import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  TableInheritance,
} from "typeorm"
import { Account } from "./Account"
import { RecordType, RecordResolvers } from "@nummus/schema"
import { Context } from ".."

// ---------------------------------------------------------------------------------------------------------------------
// Entity
// ---------------------------------------------------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------------------------------------------------
// Resolver
// ---------------------------------------------------------------------------------------------------------------------
export const RecordResolver: RecordResolvers<Context> = {
  __resolveType(record) {
    return record.type
  },
}
