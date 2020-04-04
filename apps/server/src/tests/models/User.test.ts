import User, { userPreSave } from "../../models/User"
import PasswordService from "../../services/PasswordService"

describe("User", () => {
  it("validates email", async () => {
    const email = "asd@"
    const newUser = new User({
      email,
      password: "6/12IsAGoodDate!",
    })

    await expect(newUser.validate()).rejects.toBeInstanceOf(Error)
  })

  it("validates password is strong", async () => {
    const email = "user@example.com"
    const newUser = new User({
      email,
      password: "tooWeak",
    })

    await expect(newUser.validate()).rejects.toBeInstanceOf(Error)
  })

  describe("userPreSave", () => {
    it("hashes password correctly", async () => {
      const password = "123456"
      const savingUser = {
        password,
        isModified() {
          return true
        },
      }
      const preSave = userPreSave.bind(savingUser)
      await preSave()

      expect(savingUser.password).not.toBe(password)
      expect(await PasswordService.compare(password, savingUser.password)).toBe(
        true
      )
    })

    it("when password did not change, do not re hash", async () => {
      const password = "123456"
      const savingUser = {
        password,
        isModified() {
          return false
        },
      }
      const preSave = userPreSave.bind(savingUser)
      await preSave()

      expect(savingUser.password).toBe(password)
    })
  })

  describe("removeToken", () => {
    it("removes correctly", () => {
      const newUser = new User({
        email: "e@e.com",
        password: "usKJHDlk!!1..",
      })
      const anotherToken = "myToken"
      const targetToken = "targetToken"
      const coolToken = "coolToken"
      newUser.tokens = [anotherToken, targetToken, coolToken]

      newUser.removeToken(targetToken)

      expect(newUser.tokens).toHaveLength(2)
      expect(newUser.tokens[0]).toBe(anotherToken)
      expect(newUser.tokens[1]).toBe(coolToken)
    })
  })
})
