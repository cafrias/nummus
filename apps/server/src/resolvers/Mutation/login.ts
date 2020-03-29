import User from "../../models/User"

interface LoginInput {
  input: {
    email: string
    password: string
  }
}

export default async function login(_: any, { input }: LoginInput) {
  try {
    const user = await User.find({
      email: input.email,
    })
    // TODO: finish login flow
    return user
  } catch (err) {
    // Something went wrong
    throw new Error("DO better with errors")
  }
}
