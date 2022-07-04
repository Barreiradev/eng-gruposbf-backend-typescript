export default class ServerError extends Error {
  constructor (error?: Error) {
    super('Server failed. Try again soon or contact us.')
    this.name = 'ServerError'
    this.stack = error?.stack
  }
}
