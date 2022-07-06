import IsoCodeCurrencyValidator from '@/application/validation/iso-currency-code-validator'
import ISOCurrencyCodeError from '@/application/errors/iso-currency-code-error'

describe('IsoCodeCurrencyValidator', () => {
  it('should return ISOCurrencyCodeError if code is not an ISO currency code', () => {
    const sut = new IsoCodeCurrencyValidator('any_value', 'code')

    const error = sut.validate()

    expect(error).toEqual(new ISOCurrencyCodeError('code'))
  })
  it('should return empty if code is valid', () => {
    const sut = new IsoCodeCurrencyValidator('BRL', 'code')

    const error = sut.validate()

    expect(error).toEqual(undefined)
  })
})
