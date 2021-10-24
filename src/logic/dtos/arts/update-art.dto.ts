import { Validate } from "../utils/validate";

export class UpdateArtDto {
  constructor(
    public readonly id: string,
    public readonly image?: string,
    public readonly description?: string,
    public readonly artist?: string
  ) {}

  static from(body: Partial<UpdateArtDto>) {
    if (!body.id) {
      throw new Error("missing id property");
    }
    if (body.image) {
      Validate.validateSize(body.image, 5, "image");
    }
    if (body.artist) {
      Validate.validateSize(body.artist, 5, "artist");
    }
    if (body.description) {
      Validate.validateSize(body.description, 5, "description");
    }

    return new UpdateArtDto(body.id, body.image, body.description, body.artist);
  }
}
