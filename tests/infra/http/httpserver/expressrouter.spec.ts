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

  it('should call handle with empty request', async () => {
    const req = getMockReq()
    await sut(req, res, next)

    expect(controller.handle).toHaveBeenCalledWith({})
    expect(controller.handle).toHaveBeenCalledTimes(1)
  })

  it('should respond with 200 and valid data', async () => {
    await sut(req, res, next)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith(mockDataResponse)
    expect(res.json).toHaveBeenCalledTimes(1)
  })

  it('should respond with 400 and valid error', async () => {
    controller.handle.mockResolvedValueOnce({
      statusCode: 400,
      data: new Error('ANY_ERROR')
    })
    await sut(req, res, next)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({ error: 'ANY_ERROR' })
    expect(res.json).toHaveBeenCalledTimes(1)
  })

  it('should respond with 500 and valid error', async () => {
    controller.handle.mockResolvedValueOnce({
      statusCode: 500,
      data: new Error('ANY_ERROR')
    })
    await sut(req, res, next)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({ error: 'ANY_ERROR' })
    expect(res.json).toHaveBeenCalledTimes(1)
  })
})
