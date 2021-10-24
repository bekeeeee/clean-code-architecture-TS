export class GetOneUserByEmailAndPasswordDto {
  constructor(
    public readonly email: string,
    public readonly password: string
  ) {}

  static from(body: Partial<GetOneUserByEmailAndPasswordDto>) {
    if (!body.email) {
      throw new Error('missing email property')
    }

    if (!body.password) {
      throw new Error('missing password property')
    }

    return new GetOneUserByEmailAndPasswordDto(body.email, body.password)
  }
}
