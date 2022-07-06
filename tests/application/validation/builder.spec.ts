export class RequiredFieldError extends Error {
  constructor (fieldName: string) {
    super(`The field ${fieldName} is required`)
  }
}

export class RequiredStringValidator {
  constructor (
    private readonly value: string,
    private readonly fieldName: string
  ) {}

  validate (): Error | undefined {
    if (
      this.value === '' ||
      this.value === null ||
      this.value === undefined
    ) {
      return new RequiredFieldError(this.fieldName)
    }
    return undefined
  }
}

export interface Validator {
  validate: () => Error | undefined
}

export class ValidationBuilder {
  private constructor (
    private readonly value: string,
    private readonly fieldName: string,
    private readonly validators: Validator[] = []
  ) {}

  static of (params: {value: string, fieldName: string}): ValidationBuilder {
    return new ValidationBuilder(params.value, params.fieldName)
  }

  required (): ValidationBuilder {
    this.validators.push(new RequiredStringValidator(this.value, this.fieldName))
    return this
  }

  build (): Validator[] {
    return this.validators
  }
}

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
