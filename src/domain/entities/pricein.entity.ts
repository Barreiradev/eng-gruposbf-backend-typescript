export type PriceInData = {
  priceinParam: string
  codeinParam: string
}

export default class PriceIn {
  pricein: string
  codein: string

  constructor (params: PriceInData) {
    this.pricein = params.priceinParam
    this.codein = params.codeinParam
  }
}
