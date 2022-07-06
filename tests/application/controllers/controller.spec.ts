import { mocked } from 'jest-mock'
import InternalServerError from '@/domain/errors/internal-server-error'
import ServerError from '@/domain/errors/server-error'
import { HttpResponse } from '@/application/helpers/http/http-helpers'
import Controller from '@/application/controllers/controller'
import ValidationComposite from '@/application/validation/composite'

jest.mock('@/application/validation/composite')

class ControllerStub extends Controller {
  result: HttpResponse = {
    statusCode: 200,
    data: 'any_data'
  }

  async perform (httpRequest: any): Promise<HttpResponse<any>> {
    return this.result
  }
}

describe('Controller', () => {
  let sut: ControllerStub

  beforeEach(() => {
    sut = new ControllerStub()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return 400 if validation fails', async () => {
    const error = new Error('Validation Error')
    const validationCompositeSpy = jest.fn().mockImplementationOnce(() => ({
      validate: jest.fn().mockReturnValueOnce(error)
    }))
    mocked(ValidationComposite).mockImplementationOnce(validationCompositeSpy)

    const httpResponse = await sut.handle({
      price: '529.99',
      code: 'BRL',
      codein: ['']
    })

    expect(ValidationComposite).toHaveBeenCalledWith([])
    expect(httpResponse).toEqual({
      statusCode: 400,
      data: error
    })
  })

  it('should return 500 if perform method fail', async () => {
    const error = new ServerError(new InternalServerError())
    jest.spyOn(sut, 'perform').mockResolvedValueOnce({
      statusCode: 500,
      data: error
    })

    const httpResponse = await sut.handle({
      price: '529.99',
      code: 'BRL',
      codein: ['USD', 'EUR']
    })

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: error
    })
  })

  it('should return 500 if perform method fail for any reason', async () => {
    const error = new ServerError(new Error('[ANY_INFRA_ERROR]'))
    jest.spyOn(sut, 'perform').mockResolvedValueOnce({
      statusCode: 500,
      data: error
    })

    const httpResponse = await sut.handle({
      price: '529.99',
      code: 'BRL',
      codein: ['USD', 'EUR']
    })

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: error
    })
  })

  it('should return same result as perform', async () => {
    const httpResponse = await sut.handle({
      price: '529.99',
      code: 'BRL',
      codein: ['USD', 'EUR']
    })

    expect(httpResponse).toEqual(sut.result)
  })
})
