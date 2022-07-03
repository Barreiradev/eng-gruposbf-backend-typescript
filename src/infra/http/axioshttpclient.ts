import axios, { AxiosResponse } from 'axios'
import HttpClient, { HttpRequest, HttpResponse } from '../gateways/http.gateway'

export default class AxiosHttpClient implements HttpClient {
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
