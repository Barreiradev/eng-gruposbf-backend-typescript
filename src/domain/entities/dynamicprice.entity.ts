export type DynamicPriceData = {
  priceParam: string
  codeParam: string
}

export default class DynamicPrice {
  price: string
  code: string

  constructor (
    params: DynamicPriceData
  ) {
    this.price = params.priceParam
    this.code = params.codeParam
  }
}
