import { api } from './app'
import dotenv from 'dotenv'

const port = process.env.API_PORT || 3000
dotenv.config()

api.listen(port, () => {
  console.log(`Server start ${port}`)
})
