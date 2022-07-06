import { RequiredStringValidator } from '@/application/validation/required-string-validator'
import { ValidationBuilder } from '@/application/validation/validation-builder'

describe('Validation builder', () => {
  it('should return a RequiredString validator', () => {
    const validators = ValidationBuilder.of({
      value: '', fieldName: 'any_field_name'
    }).required().build()

    expect(validators).toEqual([
      new RequiredStringValidator('', 'any_field_name')
    ])
  })
})
