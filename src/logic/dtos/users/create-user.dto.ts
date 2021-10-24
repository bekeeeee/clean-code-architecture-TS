import { Validate } from '../utils/validate'

export class CreateUserDto {
  constructor(
    public readonly username: string,
    public readonly email: string,
    public readonly password: string,
    public readonly role: string,
    public readonly phoneNumber: string
  ) {}

  static from(body: Partial<CreateUserDto>) {
    Validate.validateEmail(body.email!)
    Validate.validateSize(body.username!, 5, 'username')
    Validate.validateSize(body.password!, 5, 'password')
    Validate.validateEnum(body.role!, ['admin', 'user'], 'role')
    Validate.validateSize(body.phoneNumber!, 8, 'phoneNumber')

    return new CreateUserDto(
      body.username!,
      body.email!,
      body.password!,
      body.role!,
      body.phoneNumber!
    )
  }
}
