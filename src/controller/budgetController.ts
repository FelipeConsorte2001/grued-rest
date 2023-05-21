import { type Request, type Response } from 'express'
import { type IErroParameters } from '../types/IErroParameters.interface'
import { type IBudget } from '../types/IBudget.interface'
import servicesProduct from '../services/servicesProduct'
import servicesCategory from '../services/servicesCategory'

const budgetController = {
  createBudget: async (req: Request, res: Response): Promise<Response> => {
    try {
      const validParams = budgetController.validateBody(req.body)
      if (validParams.invalid) return res.status(500).json({ error: validParams.menssagem })
      const validQuantity = await budgetController.validQuantity(Number(req.body.quantity), req.body.products.name)
      if (validQuantity.invalid) return res.status(500).json({ error: validQuantity.menssagem })
      const getFee = await budgetController.getFee(req.body.products.category)
      if (getFee.invalid) return res.status(500).json({ error: getFee.menssagem })

      const { amount, category } = req.body.products
      const interest: any = {
        Computing: 5,
        Automotive: 2.5,
        Furniture: 1
      }
      const fee = Number(interest[category]) / 100
      const val = (Number(amount) * fee / (1 - Math.pow(1 + fee, -2))).toFixed(2)

      return res.status(200).json({
        value: val,
        total: Number(val) * req.body.quantity,
        quantity: req.body.quantity
      })
    } catch (error) {
      return res.status(500).json({ response: error })
    }
  },
  validateBody: (data: IBudget): IErroParameters => {
    if (!data.quantity) return { invalid: true, menssagem: 'invalid parameters' }
    if (!data.products.category) return { invalid: true, menssagem: 'invalid parameters' }
    if (!data.products.amount) return { invalid: true, menssagem: 'invalid parameters' }
    return { invalid: false, menssagem: 'nothing' }
  },
  validQuantity: async (quantity: number, name: string): Promise<IErroParameters> => {
    const product = await servicesProduct.findProduct(name)
    if (product.quantity <= quantity) return { invalid: true, menssagem: 'invalid parameters' }
    return { invalid: false, menssagem: 'invalid parameters' }
  },
  getFee: async (name: string): Promise<any> => {
    const fee = await servicesCategory.findCategory(name)
    if (fee) return fee
    else return { invalid: true, menssagem: 'invalid parameters' }
  }
}

export default budgetController
