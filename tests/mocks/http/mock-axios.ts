import { HttpRequest } from '@/infra/gateways/http.gateway'
import axios from 'axios'

export const mockHttpResponse = (): any => ({
  body: { key: 'any_test_value' },
  status: 200
})

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.request.mockClear().mockResolvedValue(mockHttpResponse())
  return mockedAxios
}

export const mockHttpRequest = (): HttpRequest => ({
  url: 'https://anyurlfortest.com',
  method: 'get',
  body: { key: 'any_test_value' },
  headers: { 'Content-Type': 'application/json' }
})
