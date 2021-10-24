import { Validate } from '../utils/validate'

export class SigninDto {
  constructor(
    public readonly username: string,
    public readonly password: string
  ) {}

  static from(body: Partial<SigninDto>) {
    Validate.validateSize(body.username!, 5, 'username')
    Validate.validateSize(body.password!, 5, 'password')

    return new SigninDto(body.username!, body.password!)
  }
}
