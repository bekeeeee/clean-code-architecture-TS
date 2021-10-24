import { Validate } from '../utils/validate'

export class CreateArtDto {
  constructor(
    public readonly name: string,
    public readonly artist: string,
    public readonly image: string,
    public readonly description: string
  ) {}

  static from(body: Partial<CreateArtDto>) {
    Validate.validateSize(body.name!, 5, 'name')
    Validate.validateSize(body.artist!, 5, 'artist')
    Validate.validateSize(body.image!, 5, 'image')
    Validate.validateSize(body.description!, 15, 'description')
    

    return new CreateArtDto(
      body.name!,
      body.artist!,
      body.image!,
      body.description!
    )
  }
}
