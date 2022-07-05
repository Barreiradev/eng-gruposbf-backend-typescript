import { mockAxios, mockHttpRequest, mockHttpResponse } from '@/../tests/mocks/http/mock-axios'
import AxiosHttpClient from '@/infra/http/axioshttpclient'

jest.mock('axios')

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

  it('should return correct error', () => {
    const mockRequestData = mockHttpRequest()
    const mockedAxios = mockAxios()
    const sut = new AxiosHttpClient()

    mockedAxios.request.mockRejectedValueOnce({
      response: mockHttpResponse()
    })

    const promise = sut.request(mockRequestData)

    expect(promise).toEqual(mockedAxios.request.mock.results[0].value)
  })
})
