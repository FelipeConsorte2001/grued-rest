import { Router } from 'express'
import controller from '../controller/productController'

const routes = Router()

routes.post('/', controller.createProduct)
routes.get('/:product', controller.findProduct)


export default routes
