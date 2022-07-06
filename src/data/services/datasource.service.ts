import DataSourceInfo from '@/domain/entities/datasourceinfo.entity'
import { DataSources } from '@/domain/entities/datasources.enum.entity'
import DataSourceInterface, { DataSource } from '@/domain/features/datasources.interface'
import AxiosHttpClient from '@/infra/http/axioshttpclient'
import { PgCurrencyDataRepository } from '@/infra/postgres/repos/currency-data'

export default class DataSouceService implements DataSourceInterface {
  constructor (
    private readonly httpClient: AxiosHttpClient,
    private readonly databaseRepo: PgCurrencyDataRepository
  ) {}

  async execute (params: DataSource.Input): Promise<DataSource.Output> {
    const httpPromise = this.httpClient.request({
      url: params.url ?? '_NOT_INFORMED_URL',
      method: params.httpMethod ?? 'get'
    })
    const httpResponse = await Promise.all([httpPromise])
    if (httpResponse[0].statusCode !== 200) {
      const databaseData = await this.databaseRepo.load()
      return {
        data: databaseData,
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
