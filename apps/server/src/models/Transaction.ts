import { ManyToOne, ChildEntity } from "typeorm"
import { Record } from "./Record"
import { SpendCategory } from "./SpendCategory"
import { TransactionResolvers } from "@nummus/schema"
import { Context } from ".."
import { Account } from "./Account"

// ---------------------------------------------------------------------------------------------------------------------
// Entity
// ---------------------------------------------------------------------------------------------------------------------
@ChildEntity()
export class Transaction extends Record {
  @ManyToOne(_ => SpendCategory, category => category.id, { nullable: true })
  category?: SpendCategory

  constructor(input?: Partial<Transaction>) {
    super()

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
export const TransactionResolver: TransactionResolvers<Context> = {
  account(transaction, _, { orm }) {
    return orm.getRepository(Account).findOneOrFail(transaction.account)
  },
  category(transaction, _, { orm }) {
    return orm
      .getRepository(SpendCategory)
      .findOne({ where: { id: transaction.category } })
  },
}
