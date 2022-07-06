import DataSourceInfo from '@/domain/entities/datasourceinfo.entity'
import { DataSources } from '@/domain/entities/datasources.enum.entity'
import AxiosHttpClient from '@/infra/http/axioshttpclient'
import { HttpMethod } from '@/data/gateways/http-gateway.interface'
import { PgCurrencyDataRepository } from '@/infra/postgres/repos/currency-data'
import DataSouceService from '@/data/services/datasource.service'

import { GiveMeAValidWebServerResponse } from '../../mocks/http/mock-webserver-response'

import { mock, MockProxy } from 'jest-mock-extended'

describe('Data Sources service', () => {
  let currencyRepo: MockProxy<PgCurrencyDataRepository>
  let httpClient: AxiosHttpClient
  let sut: DataSouceService

  const storedCurrencyData = [
    {
      id: 1,
      reskey: 'BRLINR',
      code: 'BRL',
      codein: 'INR',
      ask: '14.65',
      create_date: '2022-07-06 09:54:02',
      request_date: 'any_timestamp_from_database'
    },
    {
      id: 2,
      reskey: 'BRLEUR',
      code: 'BRL',
      codein: 'EUR',
      ask: '0.182',
      create_date: '2022-07-06 09:54:02',
      request_date: 'any_timestamp_from_database'
    }
  ]

  beforeAll(() => {
    currencyRepo = mock()
    currencyRepo.load.mockResolvedValue(storedCurrencyData)
  })

  beforeEach(() => {
    httpClient = new AxiosHttpClient()
    sut = new DataSouceService(httpClient, currencyRepo)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should use httpclient as primary data source', async () => {
    const dataSourceOptions = {
      url: 'https:any_url.com',
      httpMethod: 'get' as HttpMethod
    }
    const spyHttpClient = jest.spyOn(httpClient, 'request').mockResolvedValueOnce({
      statusCode: 200,
      body: GiveMeAValidWebServerResponse
    })

    await sut.execute(dataSourceOptions)

    expect(spyHttpClient).toHaveBeenCalled()
    expect(spyHttpClient).toHaveBeenCalledTimes(1)
    expect(spyHttpClient).toHaveBeenCalledWith({
      url: dataSourceOptions.url,
      method: dataSourceOptions.httpMethod
    })
  })

  it('should call second data source if primary data source fails', async () => {
    const dataSourceOptions = {
      url: 'https:any_url.com',
      httpMethod: 'get' as HttpMethod
    }

    jest.spyOn(httpClient, 'request').mockResolvedValueOnce({
      statusCode: 400,
      body: new Error('[SOMETHING WENT WRONG]')
    })

    const response = await sut.execute(dataSourceOptions)

    expect(response).toEqual({
      data: storedCurrencyData,
      datasource: new DataSourceInfo({
        sourceParam: DataSources.DATABASE,
        requestDateParam: new Date(Date.now()).toString()
      })
    })
  })
})
