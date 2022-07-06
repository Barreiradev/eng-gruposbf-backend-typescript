import StringOfNumberValidator from '@/application/validation/string-of-numbers-validator'
import NotValidCharactersError from '@/application/errors/not-characters-error'

describe('NumerableStringValidator', () => {
  it('should return NotValidCharactersError if string has alphabetic characters', () => {
    const sut = new StringOfNumberValidator('not_valid_price', 'price')

    const error = sut.validate()

    expect(error).toEqual(new NotValidCharactersError('price', 'numbers'))
  })
  it('should return NotValidCharactersError if a not valid price is provided', () => {
    const sut = new StringOfNumberValidator('000000000000000', 'price')

    const error = sut.validate()

    expect(error).toEqual(new NotValidCharactersError('price', 'numbers'))
  })
  it('should return empty if price is valid', () => {
    const sut = new StringOfNumberValidator('529.99', 'price')

    const error = sut.validate()

    expect(error).toEqual(undefined)
  })
})
