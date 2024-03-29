import { Router } from 'express'
import controller from '../controller/categoryController'

const routes = Router()

routes.post('/', controller.createCategory)
routes.get('/:category', controller.findCategory)
routes.get('/', controller.findCategorys)
routes.delete('/:id', controller.deleteCategory)
routes.put('/:id', controller.updateCategory)

export default routes
