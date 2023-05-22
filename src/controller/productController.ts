import { type Request, type Response } from 'express'
import servicesProduct from '../services/servicesProduct'
import { type IProduct } from '../types/IProduct.interface'
import { type IErroParameters } from '../types/IErroParameters.interface'

const productController = {
  createProduct: async (req: Request, res: Response): Promise<Response> => {
    try {
      const validProdut = productController.validProduct(req.body)
      if (validProdut.invalid) return res.status(500).json({ error: validProdut.menssagem })

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
  findProducts: async (req: Request, res: Response): Promise<Response> => {
    try {
      const result = await servicesProduct.findProducts()
      return res.status(200).json(result)
    } catch (error) {
      return res.status(500).json({ response: error })
    }
  },
  updateProduct: async (req: Request, res: Response): Promise<Response> => {
    try {
      const validProdut = productController.validProduct(req.body)
      if (validProdut.invalid) return res.status(500).json({ error: validProdut.menssagem })
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
  },
  validProduct: (data: IProduct): IErroParameters => {
    if (!data.name) return { invalid: true, menssagem: 'invalid parameters' }
    if (!data.description) return { invalid: true, menssagem: 'invalid parameters' }
    if (!data.amount) return { invalid: true, menssagem: 'invalid parameters' }
    if (!data.idCategoria) return { invalid: true, menssagem: 'invalid parameters' }
    return { invalid: false, menssagem: 'nothing' }
  }
}

export default productController
