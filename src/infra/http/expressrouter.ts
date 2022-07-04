import Controller from '@/application/controllers/controller'
import { RequestHandler } from 'express'

export const adaptExpressRoute = (controller: Controller): RequestHandler => {
  return async (request, response) => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!(request.body.price) && request.params.price) {
      request.body = {
        price: request.params.price,
        code: request.params.code,
        codein: request.params.codein.split(',')
      }
    }
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
