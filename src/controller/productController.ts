import { type Request, type Response } from 'express'
import servicesProduct from '../services/servicesProduct'
const productController = {
  createProduct: async (req: Request, res: Response): Promise<Response> => {
    try {
      const result = await servicesProduct.createProduct(req.body)
      return res.status(200).json(result)
    } catch (error) {
      return res.status(500).json({ response: error })
    }
  }
}

export default productController
