import DataSourceInfo from '../entities/datasourceinfo.entity'

export default interface DynamicPriceInterface {
  execute: (params: DynamicPrice.Input) => Promise<DynamicPrice.Output>
}

export namespace DynamicPrice {
  export type Input = {
    price: string
    code: string
    codein: string[]
  }
  export type DynamicPriceResult = {
    pricein: string
    codein: string
    ask: string
    multiplier: string
  }
  export type Output = {
    price: string
    code: string
    in: DynamicPriceResult[]
    datasourceinfo: DataSourceInfo
  }
}
