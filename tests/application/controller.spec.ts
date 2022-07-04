/**
 * MOVE TO: DOMAIN>ERRORS
 */
export class ServerError extends Error {
  constructor (error?: Error) {
    super('Server failed. Try again soon or contact us.')
    this.name = 'ServerError'
    this.stack = error?.stack
  }
}

/**
 * MOVE TO: APPLICATION>HELPERS
 */
type HttpResponse<T = any> = {
  statusCode: number
  data: T
}

/**
 * MOVE TO: APPLICATION>HELPERS
 */
const serverError = (error: Error): HttpResponse<Error> => ({
  statusCode: 500,
  data: new ServerError(error)
})

/**
 * MOVE TO: APPLICATION>CONTROLLERS
 */
abstract class Controller {
  abstract perform (httpRequest: any): Promise<HttpResponse>

  async handle (httpRequest: any): Promise<HttpResponse> {
    try {
      return await this.perform(httpRequest)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}

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
