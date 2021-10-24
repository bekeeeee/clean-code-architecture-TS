export class CouldNotFindUserException extends Error {
  constructor() {
    super('Missing user')
  }
}
