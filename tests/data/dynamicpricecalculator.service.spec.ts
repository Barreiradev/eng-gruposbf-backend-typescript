import DynamicPriceCalculatorInterface, { DynamicPrice } from '@/domain/features/dynamicpricecalculator.interface'

class DynamicPriceCalculatorService implements DynamicPriceCalculatorInterface {
  async calculate (params: DynamicPrice.Input): Promise<DynamicPrice.Output> {
    console.log('[PARAMS]: ', params)
    const priceCast = Number(params.price)
    const currencyCast = Number(params.currency)
    const multiplierCast = Number(params.multiplier)
    const dynamicPrice = priceCast * (currencyCast * multiplierCast)
    const local = dynamicPrice.toLocaleString('en-US', {
      style: 'currency',
      currency: params.localeKey
    })
    return {
      pricein: local,
      codein: params.localeKey,
      ask: params.currency,
      multiplier: `${params.multiplier}X`
    }
  }
}

describe('Dynamic price calculator', () => {
  let sut: DynamicPriceCalculatorService

  beforeEach(() => {
    sut = new DynamicPriceCalculatorService()
  })

  it('should calculate dynamic price with multipliar 1X', async () => {
    const inputData = {
      price: '529.99',
      currency: '0.1876',
      multiplier: '1',
      localeKey: 'USD'
    }
    const call = await sut.calculate(inputData)
    expect(call).toEqual({
      pricein: '$99.43',
      codein: inputData.localeKey,
      ask: inputData.currency,
      multiplier: '1X'
    })
  })
})
