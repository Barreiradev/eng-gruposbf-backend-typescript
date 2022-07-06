export class NotValidCharactersError extends Error {
  constructor (fieldName: string, allowedCharactersType: string) {
    super(`Not valid characters in ${fieldName}, only ${allowedCharactersType} are allowed`)
  }
}

export class NumerableStringValidator {
  constructor (
    private readonly value: string,
    private readonly fieldName: string) {}

  validate (): Error | undefined {
    const regex = /[0-9]/
    const minLengthRegex = new RegExp(regex)
    const executeRegex = minLengthRegex.test(this.value)
    if (!executeRegex) {
      return new NotValidCharactersError(this.fieldName, 'numbers')
    }
    return undefined
  }
}

describe('NumerableStringValidator', () => {
  it('should return NotValidCharactersError if string has alphabetic characters', () => {
    const sut = new NumerableStringValidator('not_valid_vatNumber', 'vatNumber')

    const error = sut.validate()

    expect(error).toEqual(new NotValidCharactersError('vatNumber', 'numbers'))
  })
})
