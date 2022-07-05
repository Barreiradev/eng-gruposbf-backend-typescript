import { NextFunction, Request, Response } from 'express'
export const transformParamstoBody = (request: Request, response: Response, next: NextFunction): void => {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!(request.body.price) && request.params.price) {
    request.body = {
      price: request.params.price,
      code: request.params.code,
      codein: request.params.codein.split(',')
    }
  }
  next()
}
