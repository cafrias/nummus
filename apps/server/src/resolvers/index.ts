import Query from "./Query"
import Mutation from "./Mutation"

import Account from "./Account"
import Budget from "./Budget"
import Record from "./Record"
import Transaction from "./Transaction"

const resolverMap = {
  Query,
  Mutation,

  Account,
  Budget,
  Record,
  Transaction,
}

export default resolverMap
