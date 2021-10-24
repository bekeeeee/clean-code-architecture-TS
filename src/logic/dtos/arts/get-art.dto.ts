export class GetOneArtDto {
  constructor(public readonly id: string) {}

  static from(body: Partial<GetOneArtDto>) {
    if (!body.id) {
      throw new Error('missing id property')
    }

    return new GetOneArtDto(body.id)
  }
}
