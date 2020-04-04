import User from "../../../models/User"
import { getTestConnection } from "../../db/db"
import { Mongoose } from "mongoose"
import me from "../../../resolvers/Query/me"
import { AuthenticationError } from "apollo-server"

function cleanup() {
  return User.deleteMany({})
}

describe("login resolver", () => {
  const email = "user@example.com"
  const password = "SuperStrong4ass!"
  let db: Mongoose

  beforeAll(async () => {
    db = await getTestConnection()
  })

  it("when logged in, returns the currently logged in user", async () => {
    const token = "my_token"
    const user = new User({
      email,
      password,
    })
    await user.save()

    const result = await me({}, {}, { db, user, token })

    expect(result.id).toBe(user.id)

    return cleanup()
  })

  it("when not logged in, throws", async () => {
    await expect(
      me({}, {}, { db, token: null, user: null })
    ).rejects.toBeInstanceOf(AuthenticationError)
  })
})
