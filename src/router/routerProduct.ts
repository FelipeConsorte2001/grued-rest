import { Router } from 'express'
import controller from '../controller/productController'

const routes = Router()

routes.post('/', controller.createProduct)


export default routes
