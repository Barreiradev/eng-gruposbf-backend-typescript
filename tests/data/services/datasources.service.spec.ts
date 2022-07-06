import DataSourceInfo from '@/domain/entities/datasourceinfo.entity'
import { DataSources } from '@/domain/entities/datasources.enum.entity'
import DataSourceInterface, { DataSource } from '@/domain/features/datasources.interface'
import AxiosHttpClient from '@/infra/http/axioshttpclient'
import { GiveMeAValidWebServerResponse } from '../../mocks/http/mock-webserver-response'
import { HttpMethod } from '@/data/gateways/http-gateway.interface'

class DataSouceService implements DataSourceInterface {
  constructor (
    private readonly httpClient: AxiosHttpClient
  ) {}

  async execute (params: DataSource.Input): Promise<DataSource.Output> {
    const httpPromise = this.httpClient.request({
      url: params.url ?? '_NOT_INFORMED_URL',
      method: params.httpMethod ?? 'get'
    })
    const httpResponse = await Promise.all([httpPromise])
    if (httpResponse[0].statusCode !== 200) {
      return {
        data: '[CALL SECOND DATA SOURCE]',
        datasource: new DataSourceInfo({
          sourceParam: DataSources.DATABASE,
          requestDateParam: new Date(Date.now()).toString()
        })
      }
    }
    return {
      data: httpResponse,
      datasource: new DataSourceInfo({
        sourceParam: DataSources.THIRDPARTY,
        requestDateParam: new Date(Date.now()).toString()
      })
    }
  }
}

describe('Data Sources service', () => {
  let httpClient: AxiosHttpClient
  let sut: DataSouceService

  beforeEach(() => {
    httpClient = new AxiosHttpClient()
    sut = new DataSouceService(httpClient)
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
      data: '[CALL SECOND DATA SOURCE]',
      datasource: new DataSourceInfo({
        sourceParam: DataSources.DATABASE,
        requestDateParam: new Date(Date.now()).toString()
      })
    })
  })
})
