import DynamicPriceService from '@/data/services/dynamicprice.service'
import { DynamicPrice } from '@/domain/features/dynamicprice.interface'
// import DataSourceInfo from '@/domain/entities/datasourceinfo.entity'
// import PriceIn from '@/domain/entities/pricein.entity'
import { HttpResponse, success } from '../helpers/http/http-helpers'
import Controller from './controller'

type HttpRequest = {
  price: string
  code: string
  codein: string[]
}

// type ModelPriceIn = {
//   in: PriceIn
//   ask: string
//   multiplier: string
// }

// type Model = {
//   price: string
//   code: string
//   in: ModelPriceIn[]
//   datasourceinfo: DataSourceInfo
// }

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
