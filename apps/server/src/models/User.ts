import mongoose, { Schema, Document } from "mongoose"
import validator from "validator"

import PasswordService from "../services/PasswordService"

// -------------------------------------------------------------------------------------------------
// Types
// -------------------------------------------------------------------------------------------------
export interface IUser extends Document {
  email: string
  password: string
  tokens: string[]

  removeToken(token: string): void
}

// -------------------------------------------------------------------------------------------------
// Schema
// -------------------------------------------------------------------------------------------------
const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator(value: any) {
          if (typeof value !== "string") {
            return false
          }

          return validator.isEmail(value)
        },
        message(props) {
          return `${props.value} is not a valid email`
        },
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator(value: any) {
          if (typeof value !== "string") {
            return false
          }

          return PasswordService.isSecure(value)
        },
        message(props) {
          return `Password '${props.value}' is too weak`
        },
      },
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

UserSchema.methods.removeToken = function removeToken(token: string) {
  const idx = (this.tokens as string[]).indexOf(token)
  if (idx >= 0) {
    ;(this.tokens as string[]).splice(idx, 1)
  }
}

// -------------------------------------------------------------------------------------------------
// Middleware
// -------------------------------------------------------------------------------------------------
export async function userPreSave() {
  this.password = await PasswordService.hashPassword(this.password)
}
UserSchema.pre("save", userPreSave)

// -------------------------------------------------------------------------------------------------
// Model
// -------------------------------------------------------------------------------------------------
const User = mongoose.model<IUser>("User", UserSchema)

export default User
