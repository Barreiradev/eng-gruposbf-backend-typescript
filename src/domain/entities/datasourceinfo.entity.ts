import { DataSources } from './datasources.enum.entity'

export type DataSourceInfoData = {
  sourceParam: DataSources
  requestDateParam: string
}

export default class DataSourceInfo {
  source: DataSources
  requestDate: string

  constructor (params: DataSourceInfoData) {
    this.source = params.sourceParam
    this.requestDate = params.requestDateParam
  }
}
