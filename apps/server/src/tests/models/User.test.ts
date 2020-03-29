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
      }
      const preSave = userPreSave.bind(savingUser)
      await preSave()

      expect(savingUser.password).not.toBe(password)
      expect(await PasswordService.compare(password, savingUser.password)).toBe(
        true
      )
    })
  })
})
