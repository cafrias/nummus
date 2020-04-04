import User from "../../../models/User"
import { getTestConnection } from "../../db/db"
import login from "../../../resolvers/Mutation/login"
import { Mongoose } from "mongoose"
import { LoginError } from "../../../lib/errors/LoginError"

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

  describe("when logging in", () => {
    it("logs in correctly", async () => {
      const user = new User({
        email,
        password,
      })
      await user.save()

      const input = {
        email,
        password,
      }

      const result = await login({}, { input }, { db, token: null, user: null })

      expect(result.user.id).toBe(user.id)
      expect(result.user.tokens).toContain(result.token)

      return cleanup()
    })

    it("when user not found, fails", async () => {
      const input = {
        email: "something@example.com",
        password: "123456",
      }

      await expect(
        login({}, { input }, { db, token: null, user: null })
      ).rejects.toBeInstanceOf(LoginError)
    })

    it("when password is invalid, fails", async () => {
      const user = new User({
        email,
        password,
      })
      await user.save()

      const input = {
        email,
        password: "123456",
      }

      await expect(
        login({}, { input }, { db, token: null, user: null })
      ).rejects.toBeInstanceOf(LoginError)

      return cleanup()
    })
  })

  describe("when refreshing the token", () => {
    const token = "my_crazy_token"

    it("if user is already logged in, refreshes the token", async () => {
      const user = new User({
        email,
        password,
        tokens: [token],
      })
      await user.save()

      const input = {
        email,
        password,
      }

      const result = await login({}, { input }, { db, token, user })

      expect(result.user.id).toBe(user.id)
      expect(result.user.tokens).toContain(result.token)
      expect(result.user.tokens).not.toContain(token)

      return cleanup()
    })

    it("when user is invalid, fails", async () => {
      const user = new User({
        email,
        password,
      })
      const input = {
        email: "something@example.com",
        password,
      }

      await expect(
        login({}, { input }, { db, token, user })
      ).rejects.toBeInstanceOf(LoginError)
    })

    it("when password is invalid", async () => {
      const user = new User({
        email,
        password,
      })
      await user.save()

      const input = {
        email,
        password: "123456",
      }

      await expect(
        login({}, { input }, { db, token, user })
      ).rejects.toBeInstanceOf(LoginError)

      return cleanup()
    })
  })
})
