import { HttpRequest } from '@/data/gateways/http-gateway.interface'
import { badRequest, HttpResponse, serverError } from '../helpers/http/http-helpers'
import ValidationComposite from '../validation/composite'
import { Validator } from '../validation/validator'

export default abstract class Controller {
  abstract perform (httpRequest: any): Promise<HttpResponse>

  buildValidators (httpRequest: any): Validator[] {
    return []
  }

  async handle (httpRequest: any): Promise<HttpResponse> {
    const error = this.validate(httpRequest)
    if (error !== undefined) {
      return badRequest(error)
    }
    try {
      return await this.perform(httpRequest)
    } catch (error) {
      return serverError(error as Error)
    }
  }

  private validate (httpRequest: HttpRequest): Error | undefined {
    const validators = this.buildValidators(httpRequest)
    return new ValidationComposite(validators).validate()
  }
}
