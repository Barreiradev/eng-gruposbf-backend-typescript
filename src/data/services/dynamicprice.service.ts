import DynamicPriceInterface, { DynamicPrice } from '@/domain/features/dynamicprice.interface'
import AxiosHttpClient from '@/infra/http/axioshttpclient'
import DynamicPriceCalculatorService from './dynamicpricecalculator.service'

export default class DynamicPriceService implements DynamicPriceInterface {
  constructor (
    private readonly httpClient: AxiosHttpClient,
    private readonly dynamicPriceCalculator: DynamicPriceCalculatorService
  ) {}

  async execute (params: DynamicPrice.Input): Promise<DynamicPrice.Output> {
    const url = 'https://economia.awesomeapi.com.br/json/last/BRL-USD,BRL-EUR,BRL-INR'
    const httpResponseA = this.httpClient.request({
      url: url,
      method: 'get'
    })
    const httpResponse = await Promise.all([httpResponseA])
    const dynamicPriceList: DynamicPrice.DynamicPriceResult[] = []
    for (const keypart of params.codein) {
      const key = `${params.code}${keypart}` as keyof typeof httpResponse[0]
      const askVal = httpResponse[0].body[key].ask
      const dynamicPrice = this.dynamicPriceCalculator.calculate({
        price: params.price,
        currency: askVal,
        localeKey: keypart
      })
      dynamicPriceList.push(dynamicPrice)
    }
    const response: DynamicPrice.Output = {
      price: params.price,
      code: params.code,
      in: dynamicPriceList,
      datasourceinfo: httpResponse[0].body.datasourceinfo
    }
    return response
  }
}
