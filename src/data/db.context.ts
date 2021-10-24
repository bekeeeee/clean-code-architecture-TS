import { injectable } from "inversify";
import mongoose from "mongoose";
import { artsModel, IArt } from "./art/arts.model";
import { IUser, UserModel, userSchema } from "./user/user.model";

@injectable()
export class DBContext {
  private _db: typeof mongoose;

  async connect() {
    this._db = await mongoose.connect(process.env.DB_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log("connected to DB");
  }

  get art() {
    return this._db.model<IArt>("Art", artsModel);
  }

  get user() {
    return this._db.model<IUser, UserModel>("User", userSchema);
  }
}
