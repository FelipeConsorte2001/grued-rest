import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import routerCategory from './router/routerCategory'
import routerProduct from './router/routerProduct'
import routerBudget from './router/routerBudget'

dotenv.config()

const api = express()

api.use(express.json())
api.use(cors())
api.use('/api/category', routerCategory)
api.use('/api/product', routerProduct)
api.use('/api/budget', routerBudget)

api.get('/', (req, res) => {
  res.status(200).send()
})
export { api }
