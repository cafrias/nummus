import uuidv4 from "uuid/v4"

import { SpendCategory } from "~/models/SpendCategory"
import { SpendGroup } from "~/models/SpendGroup";

export interface CreateSpendCategoryInput {
  budget: string
  name: string
  group: SpendGroup
}

export default class SpendCategoryService {
  public async create(input: CreateSpendCategoryInput): Promise<SpendCategory> {
    // TODO: implement
    return {
      id: uuidv4(),
      group: input.group,
      budget: input.budget,
      name: input.name,
    }
  }
}
