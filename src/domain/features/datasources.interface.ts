import DataSourceInfo from '../entities/datasourceinfo.entity'

type DataSourceOption = {
  url?: string
  httpMethod?: string
}

export default interface DataSourceInterface {
  execute: (params: DataSource.Input) => Promise<DataSource.Output>
}

export namespace DataSource {
  export type Input = {
    dataSourceOptions: DataSourceOption
  }
  export type Output = {
    data: any
    datasource: DataSourceInfo
  }
}
