import { User } from "./User"
import { Currency } from "./Currency"
import { SpendCategory } from "./SpendCategory"

export interface Budget {
  id: string

  user: User
  name: string
  currency: Currency
}
