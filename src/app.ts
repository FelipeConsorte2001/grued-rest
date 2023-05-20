import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import routerCategory from './router/routerCategory'

dotenv.config()

const api = express()

api.use(express.json())
api.use(cors())
api.use("/api/category", routerCategory)


api.get('/', (req, res) => {
  res.status(200).send();
});
export { api }