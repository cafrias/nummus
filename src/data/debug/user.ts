import { UserNormalized } from "~/models/User"
import { NormalizedTree } from "~/models/NormalizedTree"

const dataDebugUser: NormalizedTree<UserNormalized> = {
  "1": {
    id: "1",
    email: "me@me.com",
    name: "Me!",
    budgets: ["1"],
  },
}

export default dataDebugUser
