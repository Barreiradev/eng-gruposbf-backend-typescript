export default interface DynamicPriceCalculatorInterface {
  calculate: (params: DynamicPriceCalculator.Input) => DynamicPriceCalculator.Output
}

export namespace DynamicPriceCalculator {
  export type Input = {
    price: string
    currency: string
    multiplier?: string
    localeKey: string
  }
  export type Output = {
    pricein: string
    codein: string
    ask: string
    multiplier: string
  }
}
