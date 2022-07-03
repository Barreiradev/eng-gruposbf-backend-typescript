import { mockAxios, mockHttpRequest } from '@/../tests/mocks/http/mock-axios'
import HttpClient, { HttpRequest, HttpResponse } from '@/infra/gateways/http.gateway'
import axios, { AxiosResponse } from 'axios'

jest.mock('axios')

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

  it('should return correct response', async () => {
    const mockRequestData = mockHttpRequest()
    const mockedAxios = mockAxios()
    const sut = new AxiosHttpClient()

    const httpResponse = await sut.request(mockRequestData)
    const mockedAxiosResponse = await mockedAxios.request.mock.results[0].value

    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResponse.status,
      body: mockedAxiosResponse.data
    })
  })

  it('', async () => {})
})
