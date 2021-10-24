import { IUser } from "../../../data/user/user.model";

export class UserDto {
  constructor(
    public readonly id: string,
    public readonly username: string,
    public readonly email: string,
    public readonly role: string,
    public password: string,
    public readonly phoneNumber: string
  ) {}

  static from(entity: IUser) {
    return new UserDto(
      entity._id,
      entity.username,
      entity.email,
      entity.role,
      entity.password!,
      entity.phoneNumber
    );
  }

  static fromMany(users: IUser[]) {
    return users.map((User) => UserDto.from(User));
  }
}
