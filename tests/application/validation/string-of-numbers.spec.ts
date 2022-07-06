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
    const regex = /\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{2})/
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
    const sut = new NumerableStringValidator('not_valid_price', 'price')

    const error = sut.validate()

    expect(error).toEqual(new NotValidCharactersError('price', 'numbers'))
  })
  it('should return NotValidCharactersError if a not valid price is provided', () => {
    const sut = new NumerableStringValidator('000000000000000', 'price')

    const error = sut.validate()

    expect(error).toEqual(new NotValidCharactersError('price', 'numbers'))
  })
  it('should return empty if price is valid', () => {
    const sut = new NumerableStringValidator('529.99', 'price')

    const error = sut.validate()

    expect(error).toEqual(undefined)
  })
})
