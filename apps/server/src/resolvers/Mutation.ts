import User from "../models/User"

interface CreateUserInput {
  input: {
    email: string
    password: string
  }
}

interface LoginInput {
  input: {
    email: string
    password: string
  }
}

const Mutation = {
  async createUser(_, { input }: CreateUserInput) {
    const user = new User(input)
    return await user.save()
  },

  async login(_, { input }: LoginInput) {
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
  },
}

export default Mutation
