import DataSouceService from '@/data/services/datasource.service'
import AxiosHttpClient from '@/infra/http/axioshttpclient'
import { PgCurrencyDataRepository } from '@/infra/postgres/repos/currency-data'

export const makeDataSource = (): DataSouceService => {
  const httpClient = new AxiosHttpClient()
  const databaseRepo = new PgCurrencyDataRepository()
  return new DataSouceService(httpClient, databaseRepo)
}
