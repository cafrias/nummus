import { Mongoose } from "mongoose"
import { IUser } from "./models/User"

interface Context {
  db: Mongoose
  user: IUser | null
}
