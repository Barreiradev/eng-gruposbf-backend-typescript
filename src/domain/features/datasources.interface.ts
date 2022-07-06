import DataSourceInfo from '../entities/datasourceinfo.entity'

export default interface DataSourceInterface {
  execute: () => Promise<DataSource.Output>
}

export namespace DataSource {
  export type Output = {
    data: any
    datasource: DataSourceInfo
  }
}
