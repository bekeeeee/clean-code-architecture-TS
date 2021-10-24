import { injectable } from "inversify";
import { DBContext } from "../db.context";
import { IArt } from "./arts.model";

@injectable()
export class ArtsRepository {
  constructor(private readonly _dbContext: DBContext) {}

  async all() {
    return this._dbContext.art.find({});
  }
  async create(entity: Partial<IArt>) {
    return this._dbContext.art.create(entity);
  }

  async updateOne(payload: Partial<IArt>) {

    const foundArt = await this._dbContext.art.findById(payload.id);
    if (!foundArt) {
      throw new Error("Art does not exist");
    }

    if (payload.image) {
      foundArt.image = payload.image;
    }
    if (payload.description) {
      foundArt.description = payload.description;
    }

    if (payload.artist) {
      foundArt.artist = payload.artist;
    }

    foundArt.save();
    return foundArt;
  }

  async deleteOne(id: string) {
    return this._dbContext.art.deleteOne({ _id: id })
  }
}
