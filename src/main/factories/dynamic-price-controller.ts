import { DynamicPriceController } from '@/application/controllers/dynamic-price-controller'
import DynamicPriceService from '@/data/services/dynamicprice.service'
import DynamicPriceCalculatorService from '@/data/services/dynamicpricecalculator.service'
import AxiosHttpClient from '@/infra/http/axioshttpclient'

export const makeDynamicPriceController = (): DynamicPriceController => {
  const httpClient = new AxiosHttpClient()
  const dynamicPriceCalculator = new DynamicPriceCalculatorService()
  const dynamicPrice = new DynamicPriceService(httpClient, dynamicPriceCalculator)
  return new DynamicPriceController(dynamicPrice)
}
