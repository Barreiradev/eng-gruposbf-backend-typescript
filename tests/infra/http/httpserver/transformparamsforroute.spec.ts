import { getMockReq, getMockRes } from '@jest-mock/express'
import { NextFunction, Request, Response } from 'express'
import { transformParamstoBody } from '@/infra/http/transformrequestparamstobody'

const mockedParams = {
  body: {},
  params: {
    price: '529.99',
    code: 'BRL',
    codein: 'USD,EUR,INR'
  }
}

describe('Transform params for route', () => {
  let req: Request
  let res: Response
  let next: NextFunction

  beforeEach(() => {
    req = getMockReq(mockedParams)
    res = getMockRes().res
    next = getMockRes().next
  })

  it('should check if body is empty and assign req.params to body', () => {
    transformParamstoBody(req, res, next)
    expect(req.body).toEqual({
      price: mockedParams.params.price,
      code: mockedParams.params.code,
      codein: ['USD', 'EUR', 'INR']
    })
    expect(next).toHaveBeenCalled()
  })
})
