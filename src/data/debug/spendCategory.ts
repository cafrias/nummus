import { NormalizedTree } from "~/models/NormalizedTree"
import { SpendCategoryNormalized } from "~/models/SpendCategory"
import { SpendGroup } from "~/models/SpendGroup"

const dataDebugSpendCategory: NormalizedTree<SpendCategoryNormalized> = {
  "1": {
    id: "1",
    name: "Internet",
    budget: "1",
    group: SpendGroup.ImmediateObligations,
  },
}

export default dataDebugSpendCategory
