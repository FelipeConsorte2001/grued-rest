import { Router } from 'express'
import controller from '../controller/categoryController'

const routes = Router()

routes.post('/', controller.createCategory)
routes.get('/:category', controller.findCategory)

export default routes
