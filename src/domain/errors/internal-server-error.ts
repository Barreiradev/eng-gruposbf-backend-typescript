export default class InternalServerError extends Error {
  constructor () {
    super('Internal Server Error')
    this.name = 'INTERNAL_SERVER_ERROR'
  }
}
