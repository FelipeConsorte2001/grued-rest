import { type Request, type Response } from 'express'
import servicesCategory from '../services/servicesCategory'
const categoryController = {
  createCategory: async (req: Request, res: Response): Promise<Response> => {
    try {
      const result = await servicesCategory.createCategory(req.body)
      return res.status(200).json(result)
    } catch (error) {
      return res.status(200).json({ response: error })
    }
  },
  findCategory: async (req: Request, res: Response): Promise<Response> => {
    try {
      const result = await servicesCategory.findCategory(req.params.category)
      return res.status(200).json(result)
    } catch (error) {
      return res.status(200).json({ response: error })
    }
  }
}

export default categoryController
