import { RequiredFieldError } from '@/application/errors/required-field-error'
import { CodeInListValidator } from '@/application/validation/codein-list-validator'

describe('Codein ISO currency list', () => {
  it('should return CodeInListError if no codein is not provided', () => {
    const sut = new CodeInListValidator([''], 'codein')

    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError('codein'))
  })

  it('should return empty if codein is valid', () => {
    const sut = new CodeInListValidator(['BRL', 'USD'], 'codein')

    const error = sut.validate()

    expect(error).toEqual(undefined)
  })
})
