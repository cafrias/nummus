import { userPreSave } from "../../src/models/User"
import PasswordService from "../../src/services/PasswordService"

describe("User", () => {
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
