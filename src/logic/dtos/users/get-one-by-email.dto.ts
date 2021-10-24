export class GetOneUserByEmailDto {
  constructor(public readonly email: string) {}

  static from(body: Partial<GetOneUserByEmailDto>) {
    if (!body.email) {
      throw new Error('missing email property')
    }

    return new GetOneUserByEmailDto(body.email)
  }
}
