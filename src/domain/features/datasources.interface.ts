import { HttpMethod } from '@/data/gateways/http-gateway.interface'
import DataSourceInfo from '../entities/datasourceinfo.entity'

export default interface DataSourceInterface {
  execute: (params: DataSource.Input) => Promise<DataSource.Output>
}

export namespace DataSource {
  export type Input = {
    url?: string
    httpMethod?: HttpMethod
  }
  export type Output = {
    data: any
    datasource: DataSourceInfo
  }
}
