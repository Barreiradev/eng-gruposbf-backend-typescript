import DynamicPriceCalculatorInterface, { DynamicPriceCalculator } from '@/domain/features/dynamicpricecalculator.interface'

export default class DynamicPriceCalculatorService implements DynamicPriceCalculatorInterface {
  calculate (params: DynamicPriceCalculator.Input): DynamicPriceCalculator.Output {
    const priceCast = Number(params.price)
    const currencyCast = Number(params.currency)
    const multiplierCast = params.multiplier === undefined ? 1 : Number(params.multiplier)
    const dynamicPrice = priceCast * (currencyCast * multiplierCast)
    const local = dynamicPrice.toLocaleString('en-US', {
      style: 'currency',
      currency: params.localeKey
    })
    return {
      pricein: local,
      codein: params.localeKey,
      ask: params.currency,
      multiplier: `${params.multiplier ?? '1'}X`
    }
  }
}
