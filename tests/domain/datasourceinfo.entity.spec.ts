import DataSourceInfo from '@/domain/entities/datasourceinfo.entity'
import { DataSources } from '@/domain/entities/datasources.enum.entity'

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
