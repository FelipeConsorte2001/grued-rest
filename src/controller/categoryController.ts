import { type Request, type Response } from 'express'
import servicesCategory from '../services/servicesCategory'
import { type ICategory } from '../types/ICategory.interface'
const categoryController = {
  createCategory: async (req: Request, res: Response): Promise<Response> => {
    try {
      const validate = categoryController.validaBody(req.body)
      if (validate) return res.status(500).json({ error: 'invalid parameter' })
      const result = await servicesCategory.createCategory(req.body)
      return res.status(200).json(result)
    } catch (error) {
      return res.status(500).json({ response: error })
    }
  },
  findCategory: async (req: Request, res: Response): Promise<Response> => {
    try {
      if (!req.params.category) { return res.status(404) }
      const result = await servicesCategory.findCategory(req.params.category)
      return res.status(200).json(result)
    } catch (error) {
      return res.status(500).json({ response: error })
    }
  },
  deleteCategory: async (req: Request, res: Response): Promise<Response> => {
    try {
      if (!req.params.id) { return res.status(404) }
      const result = await servicesCategory.deleteCategory(Number(req.params.id))
      return res.status(200).json(result)
    } catch (error) {
      return res.status(500).json({ response: error })
    }
  },
  updateCategory: async (req: Request, res: Response): Promise<Response> => {
    try {
      const validate = categoryController.validaBody(req.body)
      if (validate) return res.status(500).json({ error: 'invalid parameter' })
      const result = await servicesCategory.updateCategory(Number(req.params.id), req.body)
      return res.status(200).json(result)
    } catch (error) {
      return res.status(500).json({ response: error })
    }
  },
  validaBody: (data: ICategory): any => {
    if (!data.name || (data.name !== 'Computing' && data.name !== 'Automotive' && data.name !== 'Furniture')) { return true }
  }
}

export default categoryController
