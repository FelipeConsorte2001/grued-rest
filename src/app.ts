import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'


dotenv.config()

const api = express()

api.use(express.json())
api.use(cors())


api.use('/api', async (_, res) => res.sendStatus(200))

export { api }