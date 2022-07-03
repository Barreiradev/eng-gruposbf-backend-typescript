export default interface DynamicPriceCalculatorInterface {
  calculate: (params: DynamicPrice.Input) => Promise<DynamicPrice.Output>
}

export namespace DynamicPrice {
  export type Input = {
    price: string
    currency: string
    multiplier: string
    localeKey: string
  }
  export type Output = {
    pricein: string
    codein: string
    ask: string
    multiplier: string
  }
}
