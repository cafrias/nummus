import { schema } from "normalizr"

// ---------------------------------------------------------------------------------------------------------------------
// Model
// ---------------------------------------------------------------------------------------------------------------------
interface UserModel {
  id: string
  email: string
  name: string

  budgets: string[]
}
export interface User extends UserModel {}
export interface UserNormalized extends UserModel {}

// ---------------------------------------------------------------------------------------------------------------------
// Normalizr
// ---------------------------------------------------------------------------------------------------------------------
export const userSchema = new schema.Entity("users")
