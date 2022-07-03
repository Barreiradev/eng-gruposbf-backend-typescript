import DynamicPriceInterface, { DynamicPrice } from '@/domain/features/dynamicprice.interface'
import { GiveMeAValidAwesomeApiEconomiaResponse } from '../mocks/http/mock.awesomeapieconomia'

function calculate (price: string, pricein: string, multiplier: string, localeKey: string): DynamicPrice.DynamicPriceResult {
  const priceCast = Number(price)
  const priceinCast = Number(pricein)
  const multiplierCast = Number(multiplier)
  const dynamicPrice = priceCast * (priceinCast * multiplierCast)
  const local = dynamicPrice.toLocaleString('en-US', {
    style: 'currency',
    currency: localeKey
  })
  return {
    pricein: local,
    codein: localeKey,
    ask: pricein,
    multiplier: `${multiplier}X`
  }
}

class DynamicPriceService implements DynamicPriceInterface {
  async execute (params: DynamicPrice.Input): Promise<DynamicPrice.Output> {
    const httpResponse = GiveMeAValidAwesomeApiEconomiaResponse
    const list: DynamicPrice.DynamicPriceResult[] = []
    for (const keypart of params.codein) {
      const key = `${params.code}${keypart}` as keyof typeof httpResponse.results
      const dynamicPrice = calculate(params.price, httpResponse.results[key].ask, '2', keypart)
      list.push(dynamicPrice)
    }
    const response: DynamicPrice.Output = {
      price: params.price,
      code: params.code,
      in: list,
      datasourceinfo: httpResponse.datasourceinfo
    }
    return response
  }
}

describe('Dynamic price service', () => {
  let sut: DynamicPriceService

  beforeEach(() => {
    sut = new DynamicPriceService()
  })

  it('should calculate a dynamic price successfully', async () => {
    const dynamicPriceInput = {
      price: '529.99',
      code: 'BRL',
      codein: ['USD', 'EUR', 'INR']
    }
    const request = await sut.execute(dynamicPriceInput)
    expect(request).toEqual({
      price: dynamicPriceInput.price,
      code: dynamicPriceInput.code,
      in: expect.any(Array),
      datasourceinfo: {
        requestDate: '2022-07-03',
        source: 'gruposbf-ds-a'
      }
    })
  })
  it.skip('should get currency data successfully', () => {})
  it.skip('should rethrow if http client throws', () => {})
  it.skip('should get data from database if http client fails', () => {})
  it.skip('should rethrow if database throws', () => {})
})
