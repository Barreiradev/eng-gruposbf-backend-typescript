enum DataSources {
  THIRDPARTY = 'gruposbf-ds-a',
  DATABASE = 'gruposbf-ds-b'
}

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
