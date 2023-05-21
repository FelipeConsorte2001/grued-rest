import { Router } from 'express'
import controller from '../controller/budgetController'

const routes = Router()

routes.post('/', controller.createBudget)

export default routes
