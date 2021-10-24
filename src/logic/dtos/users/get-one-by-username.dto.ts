export class GetOneUserByUsernameDto {
  constructor(public readonly username: string) {}

  static from(body: Partial<GetOneUserByUsernameDto>) {
    if (!body.username) {
      throw new Error('missing username property')
    }

    return new GetOneUserByUsernameDto(body.username)
  }
}
