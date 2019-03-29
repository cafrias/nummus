import { OneToOne, JoinColumn, ChildEntity } from "typeorm"
import { Record } from "./Record"
import { TransferResolvers } from "@nummus/schema"
import { Context } from ".."
import { Account } from "./Account"

// ---------------------------------------------------------------------------------------------------------------------
// Entity
// ---------------------------------------------------------------------------------------------------------------------
@ChildEntity()
export class Transfer extends Record {
  @OneToOne(type => Transfer)
  @JoinColumn()
  pair: Transfer
}

// ---------------------------------------------------------------------------------------------------------------------
// Resolver
// ---------------------------------------------------------------------------------------------------------------------
export const TransferResolver: TransferResolvers<Context> = {
  account(transfer, _, { orm }) {
    return orm.getRepository(Account).findOneOrFail(transfer.account)
  },
  pair(transfer, _, { orm }) {
    return orm.getRepository(Transfer).findOneOrFail(transfer.pair)
  },
}
