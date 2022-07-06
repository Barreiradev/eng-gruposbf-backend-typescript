import DataSourceInfo from '@/domain/entities/datasourceinfo.entity'
import { DataSources } from '@/domain/entities/datasources.enum.entity'
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
    switch (currencyData.datasource.source) {
      case 'gruposbf-ds-a':
        return await this.useDataSourceA(params, currencyData)
      case 'gruposbf-ds-b':
        return await this.useDataSourceB(params, currencyData)
      default:
        return this.allDataSourcesFail()
    }
  }

  async useDataSourceA (params: DynamicPrice.Input, data: any): Promise<DynamicPrice.Output> {
    const dynamicPriceList: DynamicPrice.DynamicPriceResult[] = []
    for (const keypart of params.codein) {
      const key = `${params.code}${keypart}` as keyof typeof data.data[0]
      const askVal = data.data[0].body[key].ask
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
      datasourceinfo: data.datasource
    }
    return response
  }

  async useDataSourceB (params: DynamicPrice.Input, data: any): Promise<DynamicPrice.Output> {
    const dynamicPriceList = data.data.map((currency: any): DynamicPrice.DynamicPriceResult => {
      const dynamicPrice = this.dynamicPriceCalculator.calculate({
        price: params.price,
        currency: currency.ask,
        localeKey: currency.codein
      })
      return dynamicPrice
    })
    const response: DynamicPrice.Output = {
      price: params.price,
      code: params.code,
      in: dynamicPriceList,
      datasourceinfo: data.datasource
    }
    return response
  }

  allDataSourcesFail (): DynamicPrice.Output {
    const response: DynamicPrice.Output = {
      price: '00.00',
      code: '00.00',
      in: [{
        pricein: '00.00',
        codein: '00.00',
        ask: '00.00',
        multiplier: '00.00'
      }],
      datasourceinfo: new DataSourceInfo({
        sourceParam: DataSources.THIRDPARTY,
        requestDateParam: new Date(Date.now()).toString()
      })
    }
    return response
  }
}
