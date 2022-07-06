import DynamicPriceService from '@/data/services/dynamicprice.service'
import { DynamicPrice } from '@/domain/features/dynamicprice.interface'
import { HttpResponse, success } from '../helpers/http/http-helpers'
import { ValidationBuilder } from '../validation/validation-builder'
import { Validator } from '../validation/validator.interface'
import Controller from './controller'

type HttpRequest = {
  price: string
  code: string
  codein: string[]
}

export class DynamicPriceController extends Controller {
  constructor (
    private readonly dynamicPriceService: DynamicPriceService
  ) {
    super()
  }

  async perform (httpRequest: HttpRequest): Promise<HttpResponse<DynamicPrice.Output>> {
    const dynamicPrice = await this.dynamicPriceService.execute(httpRequest)
    return success(dynamicPrice)
  }

  override buildValidators (httpRequest: HttpRequest): Validator[] {
    return [
      ...ValidationBuilder.of({ value: httpRequest.price, fieldName: 'price' }).required().isNumber().build(),
      ...ValidationBuilder.of({ value: httpRequest.code, fieldName: 'code' }).required().isISOCode().build(),
      ...ValidationBuilder.of({ value: httpRequest.codein, fieldName: 'codein' }).isISOCodeList().build()
    ]
  }
}
