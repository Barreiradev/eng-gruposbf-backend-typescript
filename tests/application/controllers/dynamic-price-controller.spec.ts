import DynamicPriceService from '@/data/services/dynamicprice.service'
import { mock, MockProxy } from 'jest-mock-extended'
import { DynamicPriceController } from '@/application/controllers/dynamic-price-controller'
import { GiveMeAValidWebServerResponse } from '../../mocks/http/mock-webserver-response'

describe('Dynamic price controller', () => {
  let dynamicPriceService: MockProxy<DynamicPriceService>
  let sut: DynamicPriceController

  const mockInputData = {
    price: '529.99',
    code: 'BRL',
    codein: ['USD', 'EUR', 'INR']
  }

  beforeAll(() => {
    dynamicPriceService = mock()
    dynamicPriceService.execute.mockResolvedValue(GiveMeAValidWebServerResponse)
  })

  beforeEach(() => {
    sut = new DynamicPriceController(dynamicPriceService)
  })

  it('should call DynamicPriceController with correct params', async () => {
    await sut.handle(mockInputData)
    expect(dynamicPriceService.execute).toHaveBeenCalledWith(mockInputData)
    expect(dynamicPriceService.execute).toHaveBeenCalledTimes(1)
  })
})
