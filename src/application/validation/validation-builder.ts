import { CodeInListValidator } from './codein-list-validator'
import IsoCodeCurrencyValidator from './iso-currency-code-validator'
import { RequiredStringValidator } from './required-string-validator'
import StringOfNumberValidator from './string-of-numbers-validator'
import { Validator } from './validator.interface'

export class ValidationBuilder {
  private constructor (
    private readonly value: string | string[],
    private readonly fieldName: string,
    private readonly validators: Validator[] = []
  ) {}

  static of (params: {value: string | string[], fieldName: string}): ValidationBuilder {
    return new ValidationBuilder(params.value, params.fieldName)
  }

  required (): ValidationBuilder {
    this.validators.push(new RequiredStringValidator(this.value, this.fieldName))
    return this
  }

  isNumber (): ValidationBuilder {
    this.validators.push(new StringOfNumberValidator(this.value, this.fieldName))
    return this
  }

  isISOCode (): ValidationBuilder {
    this.validators.push(new IsoCodeCurrencyValidator(this.value, this.fieldName))
    return this
  }

  isISOCodeList (): ValidationBuilder {
    this.validators.push(new CodeInListValidator(this.value, this.fieldName))
    return this
  }

  build (): Validator[] {
    return this.validators
  }
}
