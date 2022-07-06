import DynamicPriceInterface, { DynamicPrice } from '@/domain/features/dynamicprice.interface'
import DataSouceService from './datasource.service'
import DynamicPriceCalculatorService from './dynamicpricecalculator.service'

export default class DynamicPriceService implements DynamicPriceInterface {
  constructor (
    private readonly currencyDataProvider: DataSouceService,
    private readonly dynamicPriceCalculator: DynamicPriceCalculatorService
  ) {}

  async execute (params: DynamicPrice.Input): Promise<DynamicPrice.Output> {
    const currencyData = await this.currencyDataProvider.execute({
      url: 'https://economia.awesomeapi.com.br/json/last/BRL-USD,BRL-EUR,BRL-INR',
      httpMethod: 'get'
    })
    const dynamicPriceList: DynamicPrice.DynamicPriceResult[] = []
    for (const keypart of params.codein) {
      const key = `${params.code}${keypart}` as keyof typeof currencyData.data[0]
      const askVal = currencyData.data[0].body[key].ask
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
      datasourceinfo: currencyData.datasource
    }
    return response
  }
}
