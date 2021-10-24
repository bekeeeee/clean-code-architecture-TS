export class CouldNotFindArtException extends Error {
  constructor() {
    super('Missing art')
  }
}
