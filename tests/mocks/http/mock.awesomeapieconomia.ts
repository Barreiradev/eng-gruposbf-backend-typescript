import DataSourceInfo from '@/domain/entities/datasourceinfo.entity'
import { DataSources } from '@/domain/entities/datasources.enum.entity'

export const GiveMeAValidAwesomeApiEconomiaResponse = {
  results: {
    BRLUSD: {
      code: 'BRL',
      codein: 'USD',
      name: 'Real Brasileiro/Dólar Americano',
      high: '0.1904',
      low: '0.1873',
      varBid: '-0.0027',
      pctChange: '-1.4',
      bid: '0.1875',
      ask: '0.1876',
      timestamp: '1656709198',
      create_date: '2022-07-01 17:59:58'
    },
    BRLEUR: {
      code: 'BRL',
      codein: 'EUR',
      name: 'Real Brasileiro/Euro',
      high: '0.1824',
      low: '0.1797',
      varBid: '-0.0016',
      pctChange: '-0.91',
      bid: '0.1798',
      ask: '0.1798',
      timestamp: '1656709142',
      create_date: '2022-07-01 17:59:02'
    },
    BRLINR: {
      code: 'BRL',
      codein: 'INR',
      name: 'Real Brasileiro/Rúpia Indiana',
      high: '15.08',
      low: '14.8',
      varBid: '-0.22',
      pctChange: '-1.46',
      bid: '14.79',
      ask: '14.82',
      timestamp: '1656709142',
      create_date: '2022-07-01 17:59:02'
    }
  },
  datasourceinfo: new DataSourceInfo({
    sourceParam: DataSources.THIRDPARTY,
    requestDateParam: '2022-07-03'
  })
}
