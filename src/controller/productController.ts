import { type Request, type Response } from 'express'
import servicesProduct from '../services/servicesProduct'
const productController = {
  createProduct: async (req: Request, res: Response): Promise<Response> => {
    try {
      if (!req.body.name) return res.status(500).json({ error: 'ivalid name' })
      if (!req.body.description) return res.status(500).json({ error: 'ivalid description' })
      if (!req.body.amount) return res.status(500).json({ error: 'ivalid amount' })
      if (!req.body.idCategoria) return res.status(500).json({ error: 'ivalid categoria' })

      const result = await servicesProduct.createProduct(req.body)
      return res.status(200).json(result)
    } catch (error) {
      return res.status(500).json({ response: error })
    }
  },
  findProduct: async (req: Request, res: Response): Promise<Response> => {
    try {
      const result = await servicesProduct.findProduct(req.params.product)
      return res.status(200).json(result)
    } catch (error) {
      return res.status(500).json({ response: error })
    }
  },
  updateProduct: async (req: Request, res: Response): Promise<Response> => {
    try {
      const result = await servicesProduct.updateProduct(Number(req.params.id), req.body)
      return res.status(200).json(result)
    } catch (error) {
      return res.status(500).json({ response: error })
    }
  },
  deleteProduct: async (req: Request, res: Response): Promise<Response> => {
    try {
      const result = await servicesProduct.deleteProduct(Number(req.params.id))
      return res.status(200).json(result)
    } catch (error) {
      return res.status(500).json({ response: error })
    }
  }

}

export default productController
