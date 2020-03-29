import jwt from "jsonwebtoken"

class JWTService {
  // TODO: send secret to .env file
  static SECRET = "123456"

  /**
   * Creates a new JWT
   * @param payload
   */
  createToken<Payload = string | object | Buffer>(payload: Payload) {
    return jwt.sign(payload as any, JWTService.SECRET)
  }

  /**
   * Verifies and returns the token payload
   * @param token
   */
  getTokenPayload<Payload = object | string>(token: string): Payload {
    const payload = jwt.verify(token, JWTService.SECRET) as unknown
    return payload as Payload
  }
}

export default new JWTService()
