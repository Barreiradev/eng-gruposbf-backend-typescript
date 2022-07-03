import { mockAxios } from '@/../tests/mocks/http/mock-axios'
import axios, { AxiosResponse } from 'axios'

jest.mock('axios')

const mockHttpRequest = (): HttpRequest => ({
  url: 'https://anyurlfortest.com',
  method: 'get',
  body: { key: 'any_test_value' },
  headers: { 'Content-Type': 'application/json' }
})

type HttpMethod = 'post' | 'get' | 'put' | 'delete'

type HttpRequest = {
  url: string
  method: HttpMethod
  body?: any
  headers?: any
}

type HttpResponse<T = any> = {
  statusCode: number
  body?: T
}

export default interface HttpClient<R = any> {
  request: (data: HttpRequest) => Promise<HttpResponse<R>>
}

class AxiosHttpClient implements HttpClient {
  async request (data: HttpRequest): Promise<HttpResponse<any>> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers
      })
    } catch (error) {
      axiosResponse = error as any
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}

describe('Axios http client', () => {
  it('should call axios with correct values', async () => {
    const mockRequestData = mockHttpRequest()
    const mockedAxios = mockAxios()
    const sut = new AxiosHttpClient()

    await sut.request(mockRequestData)

    expect(mockedAxios.request).toHaveBeenCalledWith({
      url: mockRequestData.url,
      method: mockRequestData.method,
      data: mockRequestData.body,
      headers: mockRequestData.headers
    })
  })
})
