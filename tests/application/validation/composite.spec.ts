import { Validator } from '@/application/validation/validator'
import { mock, MockProxy } from 'jest-mock-extended'

export class ValidationComposite {
  constructor (private readonly validators: Validator[]) {}

  validate (): Error | undefined {
    for (const validator of this.validators) {
      const error = validator.validate()
      if (error !== undefined) {
        return error
      }
    }
  }
}

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
})
