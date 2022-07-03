export type PriceInData = {
  pricein: string
  codein: string
}

export default class PriceIn {
  pricein: string
  codein: string

  constructor (params: PriceInData) {
    this.pricein = params.pricein
    this.codein = params.codein
  }
}
