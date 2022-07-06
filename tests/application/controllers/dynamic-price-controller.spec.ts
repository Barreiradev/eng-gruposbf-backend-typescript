import DynamicPriceService from '@/data/services/dynamicprice.service'
import { mock, MockProxy } from 'jest-mock-extended'
import { DynamicPriceController } from '@/application/controllers/dynamic-price-controller'
import { GiveMeAValidWebServerResponse } from '../../mocks/http/mock-webserver-response'
import StringOfNumberValidator from '@/application/validation/string-of-numbers-validator'
import { RequiredStringValidator } from '@/application/validation/required-string-validator'
import IsoCodeCurrencyValidator from '@/application/validation/iso-currency-code-validator'
import { CodeInListValidator } from '@/application/validation/codein-list-validator'

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

  it('should build Validators correctly', async () => {
    const validators = await sut.buildValidators({
      price: '',
      code: 'BRL',
      codein: ['USD', 'EUR', 'INR']
    })

    expect(validators).toEqual([
      new RequiredStringValidator('', 'price'),
      new StringOfNumberValidator('', 'price'),
      new RequiredStringValidator('BRL', 'code'),
      new IsoCodeCurrencyValidator('BRL', 'code'),
      new CodeInListValidator(['USD', 'EUR', 'INR'], 'codein')
    ])
  })

  it('should call DynamicPriceController with correct params', async () => {
    await sut.handle(mockInputData)
    expect(dynamicPriceService.execute).toHaveBeenCalledWith(mockInputData)
    expect(dynamicPriceService.execute).toHaveBeenCalledTimes(1)
  })

  it('should return 200 if execute method succeeds', async () => {
    const httpResponse = await sut.perform(mockInputData)
    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {
        price: mockInputData.price,
        code: mockInputData.code,
        in: GiveMeAValidWebServerResponse.in,
        datasourceinfo: GiveMeAValidWebServerResponse.datasourceinfo
      }
    })
  })
})
