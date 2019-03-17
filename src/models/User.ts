import { Budget } from "./Budget"

export interface User {
  email: string
  name: string
  budgets: Budget[]
}
