import Query from "./Query"
import Mutation from "./Mutation"
import { Resolvers } from "@nummus/schema"

import { AccountResolver } from "~/models/Account"
import { BudgetResolver } from "~/models/Budget"
import { RecordResolver } from "~/models/Record"
import { SpendCategoryResolver } from "~/models/SpendCategory"
import { TransactionResolver } from "~/models/Transaction"
import { TransferResolver } from "~/models/Transfer"
import { UserResolver } from "~/models/User"

const resolverMap: Resolvers = {
  Query,
  Mutation,

  //
  // Models
  //
  Account: AccountResolver,
  Budget: BudgetResolver,
  Record: RecordResolver,
  SpendCategory: SpendCategoryResolver,
  Transaction: TransactionResolver,
  Transfer: TransferResolver,
  User: UserResolver,
}

export default resolverMap
