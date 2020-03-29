import User from "../models/User"

const Query = {
  async me() {
    // TODO: finish flow
    return await User.findOne({})
  },
}

export default Query
