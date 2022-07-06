import AxiosHttpClient from '@/infra/http/axioshttpclient'
import DynamicPriceService from '@/data/services/dynamicprice.service'
import DynamicPriceCalculatorService from '@/data/services/dynamicpricecalculator.service'
import { GiveMeAValidAwesomeApiEconomiaResponse } from '../../mocks/http/mock.awesomeapieconomia'
import DataSouceService from '@/data/services/datasource.service'
import { PgCurrencyDataRepository } from '@/infra/postgres/repos/currency-data'
import DataSourceInfo from '@/domain/entities/datasourceinfo.entity'
import { DataSources } from '@/domain/entities/datasources.enum.entity'

describe('Dynamic price service', () => {
  let databaseRepo: PgCurrencyDataRepository
  let httpClient: AxiosHttpClient
  let dataSource: DataSouceService
  let dynamicPriceCalculator: DynamicPriceCalculatorService
  let sut: DynamicPriceService

  const dynamicPriceInput = {
    price: '529.99',
    code: 'BRL',
    codein: ['USD', 'EUR', 'INR']
  }

  beforeEach(() => {
    httpClient = new AxiosHttpClient()
    httpClient.request = jest.fn().mockImplementation(() => GiveMeAValidAwesomeApiEconomiaResponse)
    databaseRepo = new PgCurrencyDataRepository()
    dataSource = new DataSouceService(httpClient, databaseRepo)
    dynamicPriceCalculator = new DynamicPriceCalculatorService()
    sut = new DynamicPriceService(dataSource, dynamicPriceCalculator)
  })

  it('should calculate a dynamic price successfully', async () => {
    const request = await sut.execute(dynamicPriceInput)
    expect(request).toEqual({
      price: dynamicPriceInput.price,
      code: dynamicPriceInput.code,
      in: expect.any(Array),
      datasourceinfo: new DataSourceInfo({
        sourceParam: DataSources.THIRDPARTY,
        requestDateParam: new Date(Date.now()).toString()
      })
    })
  })
  it('should call httpClient with correct params', async () => {
    const spyAxios = jest.spyOn(httpClient, 'request')
    await sut.execute(dynamicPriceInput)
    expect(spyAxios).toHaveBeenCalled()
    expect(spyAxios).toHaveBeenCalledTimes(1)
    expect(spyAxios).toHaveBeenCalledWith({
      url: 'https://economia.awesomeapi.com.br/json/last/BRL-USD,BRL-EUR,BRL-INR',
      method: 'get'
    })
  })
  it('should rethrow if httpClient throws', async () => {
    httpClient.request = jest.fn().mockRejectedValueOnce(new Error('[SOMETHING WENT WRONG]'))
    const promise = sut.execute(dynamicPriceInput)
    await expect(promise).rejects.toThrow()
  })
  it.skip('should get data from database if http client fails', () => {})
  it.skip('should rethrow if database throws', () => {})
})
