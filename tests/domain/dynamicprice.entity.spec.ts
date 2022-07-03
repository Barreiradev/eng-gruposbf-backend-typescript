import DynamicPrice from '@/domain/entities/dynamicprice.entity'

describe('Dynamic price entity', () => {
  it('should create a dynamic price entity with input data', async () => {
    const sut = new DynamicPrice({ priceParam: '259.99', codeParam: 'BRL' })
    expect(sut).toEqual({
      price: '259.99',
      code: 'BRL'
    })
  })
})
