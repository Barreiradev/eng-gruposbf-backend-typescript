import PriceIn from '@/domain/entities/pricein.entity'

describe('Price in entity', () => {
  it('should create a price in entity with input data', () => {
    const sut = new PriceIn({ priceinParam: '95.40', codeinParam: 'USD' })
    expect(sut).toEqual({
      pricein: '95.40',
      codein: 'USD'
    })
  })
})
