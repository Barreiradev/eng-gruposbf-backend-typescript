import AxiosHttpClient from '@/infra/http/axioshttpclient'
import DynamicPriceService from '@/data/services/dynamicprice.service'
import DynamicPriceCalculatorService from '@/data/services/dynamicpricecalculator.service'
import { GiveMeAValidAwesomeApiEconomiaResponse } from '../../mocks/http/mock.awesomeapieconomia'

describe('Dynamic price service', () => {
  let httpClient: AxiosHttpClient
  let dynamicPriceCalculator: DynamicPriceCalculatorService
  let sut: DynamicPriceService

  const dynamicPriceInput = {
    price: '529.99',
    code: 'BRL',
    codein: ['USD', 'EUR', 'INR']
  }

  beforeEach(() => {
    httpClient = new AxiosHttpClient()
    dynamicPriceCalculator = new DynamicPriceCalculatorService()
    sut = new DynamicPriceService(httpClient, dynamicPriceCalculator)
  })

  it('should calculate a dynamic price successfully', async () => {
    httpClient.request = jest.fn().mockImplementationOnce(() => {
      return {
        statusCode: 200,
        body: GiveMeAValidAwesomeApiEconomiaResponse
      }
    })
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
  it.skip('should call httpClient with correct params', async () => {
    const spyAxios = jest.spyOn(httpClient, 'request')
    await sut.execute(dynamicPriceInput)
    expect(spyAxios).toHaveBeenCalled()
    expect(spyAxios).toHaveBeenCalledTimes(1)
    expect(spyAxios).toHaveBeenCalledWith({
      url: 'https://economia.awesomeapi.com.br/json/last/BRL-USD,BRL-EUR,BRL-INR',
      method: 'get'
    })
  })
  it.skip('should rethrow if http client throws', () => {})
  it.skip('should get data from database if http client fails', () => {})
  it.skip('should rethrow if database throws', () => {})
})
