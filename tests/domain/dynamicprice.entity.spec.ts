import DynamicPrice from '@/domain/entities/dynamicprice.entity'
import { DataSources } from '@/domain/entities/datasources.enum.entity'

const inputData = {
  priceParam: '259.99',
  codeParam: 'BRL',
  in: [
    {
      pricein: '95.40',
      codein: 'USD'
    }
  ],
  source: {
    source: DataSources.THIRDPARTY,
    requestDate: '2022-07-02'
  }
}

describe('Dynamic price entity', () => {
  it('should create a dynamic price entity with input data', () => {
    const sut = new DynamicPrice(inputData)
    expect(sut).toEqual({
      price: '259.99',
      code: 'BRL',
      in: inputData.in,
      source: inputData.source
    })
  })
})
