type DynamicPriceData = {
  priceParam: string
  codeParam: string
}

class DynamicPrice {
  price: string
  code: string

  constructor (
    params: DynamicPriceData
  ) {
    this.price = params.priceParam
    this.code = params.codeParam
  }
}

describe('Dynamic price entity', () => {
  it('should create a dynamic price entity with input data', async () => {
    const sut = new DynamicPrice({ priceParam: '259.99', codeParam: 'BRL' })
    expect(sut).toEqual({
      price: '259.99',
      code: 'BRL'
    })
  })
})
