import { injectable } from "inversify";
import { DBContext } from "../db.context";
import { IUser } from "./user.model";

@injectable()
export class UsersRepository {
  constructor(private readonly _dbContext: DBContext) {}

  async all() {
    return this._dbContext.user.find({});
  }
  async findOneByEmail(email: IUser["email"]) {
    return this._dbContext.user.findOne({ email });
  }
  async findOneByUsername(username: IUser["username"]) {
    return this._dbContext.user.findOne({ username });
  }
  async findOneByPhoneNumber(phoneNumber: IUser["phoneNumber"]) {
    return this._dbContext.user.findOne({ phoneNumber });
  }

  async findOne(username: IUser["username"], password: IUser["password"]) {
    const user = await this._dbContext.user
      .findOne({ username })
      .select("+password");

    if (!user) return null;

    if (
      !(await this._dbContext.user.correctPassword(password, user?.password!))
    )
      return null;
    else return user;
  }

  async create(entity: Partial<IUser>) {
    return this._dbContext.user.create(entity);
  }
}
