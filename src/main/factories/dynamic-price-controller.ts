import { DynamicPriceController } from '@/application/controllers/dynamic-price-controller'
import DynamicPriceService from '@/data/services/dynamicprice.service'
import DynamicPriceCalculatorService from '@/data/services/dynamicpricecalculator.service'
import { makeDataSource } from './data-source'

export const makeDynamicPriceController = (): DynamicPriceController => {
  const dataSource = makeDataSource()
  const dynamicPriceCalculator = new DynamicPriceCalculatorService()
  const dynamicPrice = new DynamicPriceService(dataSource, dynamicPriceCalculator)
  return new DynamicPriceController(dynamicPrice)
}
