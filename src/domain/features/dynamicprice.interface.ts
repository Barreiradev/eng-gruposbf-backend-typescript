export default interface DynamicPriceInterface {
  execute: (params: DynamicPrice.Input) => Promise<DynamicPrice.Output>
}

export namespace DynamicPrice {
  export type Input = {
    price: string
    code: string
    pricein: string
    codein: string
  }
  export type Output = {
    price: string
    code: string
    pricein: string
    codein: string
  }
}
