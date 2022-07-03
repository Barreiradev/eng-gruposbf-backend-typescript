type PriceInData = {
  pricein: string
  codein: string
}

class PriceIn {
  pricein: string
  codein: string

  constructor (params: PriceInData) {
    this.pricein = params.pricein
    this.codein = params.codein
  }
}

describe('Price in entity', () => {
  it('should create a price in entity with input data', () => {
    const sut = new PriceIn({ pricein: '95.40', codein: 'USD' })
    expect(sut).toEqual({
      pricein: '95.40',
      codein: 'USD'
    })
  })
})
