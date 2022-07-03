enum DataSources {
  THIRDPARTY = 'gruposbf-ds-a',
  DATABASE = 'gruposbf-ds-b'
}

type DataSourceInfoData = {
  sourceParam: string
  requestDateParam: string
}

class DataSourceInfo {
  source: string
  requestDate: string

  constructor (params: DataSourceInfoData) {
    this.source = params.sourceParam
    this.requestDate = params.requestDateParam
  }
}

describe('Dynamic price entity', () => {
  it('should create a dynamic price entity with gruposbf-ds-a data source', async () => {
    const sut = new DataSourceInfo({
      sourceParam: DataSources.THIRDPARTY,
      requestDateParam: '2022-07-03'
    })
    expect(sut).toEqual({
      source: 'gruposbf-ds-a',
      requestDate: '2022-07-03'
    })
  })
})
