import { IArt } from "../../../data/art/arts.model";

export class ArtDto {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly artist: string,
    public readonly image: string,
    public readonly description: string,

    public readonly createdAt: Date
  ) {}

  static from(entity: IArt) {
    return new ArtDto(
      entity.id,
      entity.name,
      entity.artist,
      entity.image,
      entity.description,
      entity.createdAt
    );
  }

  static fromMany(arts: IArt[]) {
    return arts.map((art) => ArtDto.from(art));
  }
}
