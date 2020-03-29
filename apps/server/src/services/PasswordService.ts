import bcrypt from "bcrypt"
import zxcvbn from "zxcvbn"

class PasswordService {
  static SALT_ROUNDS = 10

  static MIN_PASS_SCORE = 3

  /**
   * Hashes the given plain text password
   * @param plainTextPassword
   */
  async hashPassword(plainTextPassword: string) {
    const salt = await bcrypt.genSalt(PasswordService.SALT_ROUNDS)
    return await bcrypt.hash(plainTextPassword, salt)
  }

  /**
   * Compares the given plain text password with a hashed password,
   * returns true if they match
   * @param plainTextPassword
   * @param hashedPassword
   */
  async compare(plainTextPassword: string, hashedPassword: string) {
    return await bcrypt.compare(plainTextPassword, hashedPassword)
  }

  /**
   * Checks if the given password is secure
   * @param plainTextPassword
   */
  isSecure(plainTextPassword: string) {
    const { score } = zxcvbn(plainTextPassword)
    return score >= PasswordService.MIN_PASS_SCORE
  }
}

export default new PasswordService()
