import mongoose, { Schema, Document } from "mongoose"
import PasswordService from "../services/PasswordService"

export interface IUser extends Document {
  email: string
  password: string
}

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    tokens: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
)

export async function userPreSave() {
  this.password = await PasswordService.hashPassword(this.password)
}
UserSchema.pre("save", userPreSave)

export default mongoose.model<IUser>("User", UserSchema)
