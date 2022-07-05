import { Router } from 'express'
import { adaptExpressRoute } from '@/infra/http/expressrouter'
import { transformParamstoBody } from '@/infra/http/transformrequestparamstobody'
import { makeDynamicPriceController } from '../factories/dynamic-price-controller'

export default (router: Router): void => {
  const dynamicPriceController = makeDynamicPriceController()
  router.get('/convert/price/:price/code/:code/codein/:codein', transformParamstoBody, adaptExpressRoute(dynamicPriceController))
}
