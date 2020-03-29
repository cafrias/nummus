import { getTestConnection } from "../../db/db"
import signup, {
  SignupInput,
  UserTokenPayload,
  UserEmailTaken,
} from "../../../src/resolvers/Mutation/signup"
import JWTService from "../../../src/services/JWTService"
import PasswordService from "../../../src/services/PasswordService"
import User from "../../../src/models/User"

describe("signup resolver", () => {
  beforeAll(async () => {
    await getTestConnection()
  })

  beforeEach(async () => {
    await User.deleteMany({})
  })

  it("when signup valid, returns correctly", async () => {
    const email = "user@example.com"
    const password = "123456"
    const input: SignupInput = {
      input: {
        email,
        password,
      },
    }

    const result = await signup({}, input)

    // Check user is same
    expect(result.user.email).toBe(email)

    // Check token is valid
    expect(() => {
      const payload = JWTService.getTokenPayload<UserTokenPayload>(result.token)
      expect(payload.email).toBe(email)
    }).not.toThrow()

    // Check password is encrypted correctly
    const fetchedUser = await User.findOne({ email })
    expect(await PasswordService.compare(password, fetchedUser.password))

    // Token is saved in model
    expect(fetchedUser.tokens).toContain(result.token)
  })

  it("when email is alredy taken, fails", async () => {
    const email = "user@example.com"

    const existingUser = new User({
      email,
      password: "123456",
    })

    await existingUser.save()

    const input = {
      input: {
        email,
        password: "123456",
      },
    }

    await expect(signup({}, input)).rejects.toBeInstanceOf(UserEmailTaken)
  })

  xit("when password is not strong, fails", () => {})
})
