import { DataSources } from '@/domain/entities/datasources.enum.entity'

export const GiveMeAValidWebServerResponse = {
  price: '529.99',
  code: 'BRL',
  in: [
    {
      pricein: '$99.40',
      codein: 'USD',
      ask: '0.1876',
      multiplier: '1X'
    }
  ],
  datasourceinfo: {
    source: DataSources.THIRDPARTY,
    requestDate: '2022-07-03'
  }
}
