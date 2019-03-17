import { SpendCategory } from "./SpendCategory"

export interface Transaction {
  id: string

  to?: Account
  from?: Account
  category: SpendCategory
}
