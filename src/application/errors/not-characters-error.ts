export default class NotValidCharactersError extends Error {
  constructor (fieldName: string, allowedCharactersType: string) {
    super(`Not valid characters in ${fieldName}, only ${allowedCharactersType} are allowed`)
  }
}
