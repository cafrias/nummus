import { RecordResolvers } from "@nummus/schema"
import { Context } from ".."
import { Account } from "~/entity/Account"

const RecordResolver: RecordResolvers<Context> = {
  __resolveType(record) {
    return record.type
  },
}

export default RecordResolver
