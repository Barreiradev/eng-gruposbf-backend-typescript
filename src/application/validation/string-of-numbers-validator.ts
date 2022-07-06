import NotValidCharactersError from '../errors/not-characters-error'

export default class StringOfNumberValidator {
  constructor (
    private readonly value: string | string[],
    private readonly fieldName: string) {}

  validate (): Error | undefined {
    const regex = /\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{2})/
    const minLengthRegex = new RegExp(regex)
    const executeRegex = minLengthRegex.test(this.value as string)
    if (!executeRegex) {
      return new NotValidCharactersError(this.fieldName, 'numbers')
    }
    return undefined
  }
}
