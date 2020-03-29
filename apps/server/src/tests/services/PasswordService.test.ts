import PasswordService from "../../services/PasswordService"

describe("PasswordService", () => {
  describe("isSecure", () => {
    it("when password is secure, returns true", () => {
      const password = "12/31IsAGreatDate!"
      const secure = PasswordService.isSecure(password)
      expect(secure).toBe(true)
    })

    it("when password is not secure, returns false", () => {
      const insecurePasswords = ["123456", "onlyletters", "2Short!"]
      insecurePasswords.forEach(pass => {
        const secure = PasswordService.isSecure(pass)
        expect(secure).toBe(false)
      })
    })
  })
})
