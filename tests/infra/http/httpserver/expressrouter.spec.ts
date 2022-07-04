import { NextFunction, Request, RequestHandler, Response } from 'express'
import Controller from '@/application/controllers/controller'
import { getMockReq, getMockRes } from '@jest-mock/express'
import { mock, MockProxy } from 'jest-mock-extended'

const mockDataResponse = {
  price: '529,99',
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
    source: 'gruposbf-ds-a',
    requestDate: '2022-07-03'
  }
}

export const adaptExpressRoute = (controller: Controller): RequestHandler => {
  return async (request, response) => {
    const httpResponse = await controller.handle({ ...request.body })
    if (httpResponse.statusCode === 200) {
      response.status(httpResponse.statusCode).json(httpResponse.data)
    } else {
      response.status(httpResponse.statusCode).json({
        error: httpResponse.data.message
      })
    }
  }
}

describe('ExpressRouter', () => {
  let req: Request
  let res: Response
  let next: NextFunction
  let controller: MockProxy<Controller>
  let sut: RequestHandler

  beforeEach(() => {
    req = getMockReq({ body: { any: 'any' } })
    res = getMockRes().res
    next = getMockRes().next
    controller = mock()
    controller.handle.mockResolvedValue({
      statusCode: 200,
      data: mockDataResponse
    })
    sut = adaptExpressRoute(controller)
  })

  it('should call handle with correct request', async () => {
    await sut(req, res, next)

    expect(controller.handle).toHaveBeenCalledWith({ any: 'any' })
    expect(controller.handle).toHaveBeenCalledTimes(1)
  })
})
