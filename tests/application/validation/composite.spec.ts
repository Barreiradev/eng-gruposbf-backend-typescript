import { Validator } from '@/application/validation/validator.interface'
import { mock, MockProxy } from 'jest-mock-extended'
import ValidationComposite from '@/application/validation/composite'

describe('Validation composite', () => {
  let sut: ValidationComposite
  let validatorA: MockProxy<Validator>
  let validatorB: MockProxy<Validator>
  let validators: Validator[]

  beforeAll(() => {
    validatorA = mock<Validator>()
    validatorA.validate.mockReturnValue(undefined)
    validatorB = mock<Validator>()
    validatorB.validate.mockReturnValue(undefined)
    validators = [validatorA, validatorB]
  })

  beforeEach(() => {
    sut = new ValidationComposite(validators)
  })

  it('should return undefined if all Validators return undefined', () => {
    const error = sut.validate()
    expect(error).toBeUndefined()
  })

  it('should return the first error', () => {
    validatorA.validate.mockReturnValueOnce(new Error('error_A'))
    validatorB.validate.mockReturnValueOnce(new Error('error_B'))
    const error = sut.validate()
    expect(error).toEqual(new Error('error_A'))
  })

  it('should return the error', () => {
    validatorB.validate.mockReturnValueOnce(new Error('error_B'))
    const error = sut.validate()

    expect(error).toEqual(new Error('error_B'))
  })
})
