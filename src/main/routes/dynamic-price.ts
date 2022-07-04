import { Router } from 'express'
import { adaptExpressRoute } from '@/infra/http/expressrouter'
import { makeDynamicPriceController } from '../factories/dynamic-price-controller'

export default (router: Router): void => {
  const dynamicPriceController = makeDynamicPriceController()
  router.get('/convert', adaptExpressRoute(dynamicPriceController))
}
