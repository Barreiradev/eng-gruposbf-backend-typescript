import DynamicPriceService from '@/data/services/dynamicprice.service'
import { DynamicPrice } from '@/domain/features/dynamicprice.interface'
import { HttpResponse, success } from '../helpers/http/http-helpers'
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
}
