import jwt from 'jsonwebtoken'

export class Jwt {
  constructor(
    public readonly email: string,
    public readonly username: string,
    public readonly role: string
  ) {}

  static from(body: Jwt) {
    if (!body.email) {
      throw new Error('missing email property')
    }

    if (!body.username) {
      throw new Error('missing username property')
    }

    if (!body.role) {
      throw new Error('missing role property')
    }

    return new Jwt(body.email, body.username, body.role)
  }

  static async signToken(jwtDto: Jwt) {
    console.log('jwtDto====', jwtDto)
    return await jwt.sign({ ...jwtDto }, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    })
  }

  static async verifyToken(jwtData: any) {
    return jwt.verify(jwtData, process.env.JWT_SECRET!) as Jwt
  }
}
