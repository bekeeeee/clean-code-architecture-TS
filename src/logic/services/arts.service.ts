import { ArtsRepository } from '../../data/art/arts.repository'
// import { ArtDto, CreateArtDto, GetOneArtDto, UpdateArtDto } from "../dto/arts";
import { injectable } from 'inversify'
import { CreateArtDto, ArtDto, UpdateArtDto,GetOneArtDto } from '../dtos/arts'

@injectable()
export class ArtsService {
  constructor(private readonly _artsRepo: ArtsRepository) {}

  async create(createArtDto: CreateArtDto) {
    const createdArt = await this._artsRepo.create(createArtDto)
    return ArtDto.from(createdArt)
  }

  async all() {
    const subscribers = await this._artsRepo.all()
    return ArtDto.fromMany(subscribers)
  }

  async updateOne(updateArtDto: UpdateArtDto) {
    return this._artsRepo.updateOne(updateArtDto)
  }

  async deleteOne({ id }: GetOneArtDto) {
    await this._artsRepo.deleteOne(id)

    return true
  }
}
