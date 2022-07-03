import DynamicPriceCalculatorService from '@/data/services/dynamicpricecalculator.service'

describe('Dynamic price calculator', () => {
  let sut: DynamicPriceCalculatorService

  const makeInputData = (multiplierParam?: string): any => ({
    price: '529.99',
    currency: '0.1876',
    multiplier: multiplierParam,
    localeKey: 'USD'
  })

  beforeEach(() => {
    sut = new DynamicPriceCalculatorService()
  })

  it('should calculate dynamic price with multipliar 1X', async () => {
    const inputData = makeInputData('1')
    const call = await sut.calculate(inputData)
    expect(call).toEqual({
      pricein: '$99.43',
      codein: inputData.localeKey,
      ask: inputData.currency,
      multiplier: '1X'
    })
  })

  it('should calculate dynamic price with multipliar 2X', async () => {
    const inputData = makeInputData('2')
    const call = await sut.calculate(inputData)
    expect(call).toEqual({
      pricein: '$198.85',
      codein: inputData.localeKey,
      ask: inputData.currency,
      multiplier: '2X'
    })
  })

  it('should calculate dynamic price if there are no multiplier in params', async () => {
    const inputData = makeInputData()
    const call = await sut.calculate(inputData)
    expect(call).toEqual({
      pricein: '$99.43',
      codein: inputData.localeKey,
      ask: inputData.currency,
      multiplier: '1X'
    })
  })
})
