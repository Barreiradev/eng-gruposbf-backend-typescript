import ServerError from '@/domain/errors/server-error'

export type HttpResponse<T = any> = {
  statusCode: number
  data: T
}

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: 400,
  data: error
})

export const serverError = (error: Error): HttpResponse<Error> => ({
  statusCode: 500,
  data: new ServerError(error)
})

export const success = <T = any> (data: T): HttpResponse<T> => ({
  statusCode: 200,
  data: data
})
