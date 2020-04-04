import { getTestConnection } from "../../db/db"
import signup, {
  SignupInput,
  UserTokenPayload,
  SignUpEmailTakenError,
  SignUpWeakPasswordError,
  SignUpInvalidEmailError,
} from "../../../resolvers/Mutation/signup"
import JWTService from "../../../services/JWTService"
import PasswordService from "../../../services/PasswordService"
import User from "../../../models/User"

// -------------------------------------------------------------------------------------------------
// Helpers
// -------------------------------------------------------------------------------------------------
async function cleanup() {
  await User.deleteMany({})
}

// -------------------------------------------------------------------------------------------------
// Suite
// -------------------------------------------------------------------------------------------------

describe("signup resolver", () => {
  const email = "user@example.com"
  const password = "12/31IsAGreatDate!"

  beforeAll(async () => {
    await getTestConnection()
  })

  it("when signup valid, returns correctly", async () => {
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
    if (!fetchedUser) {
      throw new Error("User not found")
    }
    expect(await PasswordService.compare(password, fetchedUser.password))

    // Token is saved in model
    expect(fetchedUser.tokens).toContain(result.token)

    return cleanup()
  })

  it("when email is already taken, fails", async () => {
    const existingUser = new User({
      email,
      password,
    })

    await existingUser.save()

    const input = {
      input: {
        email,
        password,
      },
    }

    await expect(signup({}, input)).rejects.toBeInstanceOf(
      SignUpEmailTakenError
    )

    return cleanup()
  })

  it("when password is not strong, fails", async () => {
    const input = {
      input: {
        email,
        password: "tooWeak",
      },
    }

    await expect(signup({}, input)).rejects.toBeInstanceOf(
      SignUpWeakPasswordError
    )
  })

  it("when email is invalid format, fails", async () => {
    const input = {
      input: {
        email: "nonvalid@",
        password,
      },
    }

    await expect(signup({}, input)).rejects.toBeInstanceOf(
      SignUpInvalidEmailError
    )
  })
})
