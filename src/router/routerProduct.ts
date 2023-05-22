import { Router } from 'express'
import controller from '../controller/productController'

const routes = Router()

routes.post('/', controller.createProduct)
routes.get('/:product', controller.findProduct)
routes.get('/', controller.findProducts)
routes.put('/:id', controller.updateProduct)
routes.delete('/:id', controller.deleteProduct)

export default routes
