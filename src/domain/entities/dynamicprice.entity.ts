import DataSourceInfo from './datasourceinfo.entity'
import PriceIn from './pricein.entity'

export type DynamicPriceData = {
  priceParam: string
  codeParam: string
  in: PriceIn[]
  source: DataSourceInfo
}

export default class DynamicPrice {
  price: string
  code: string
  in: PriceIn[]
  source: DataSourceInfo

  constructor (
    params: DynamicPriceData
  ) {
    this.price = params.priceParam
    this.code = params.codeParam
    this.in = params.in
    this.source = params.source
  }
}
