import { type Request, type Response } from 'express'
import { type IErroParameters } from '../types/IErroParameters.interface'
import { type IBudget } from '../types/IBudget.interface'

const budgetController = {
  createBudget: async (req: Request, res: Response): Promise<Response> => {
    try {
      const valid = budgetController.validateBody(req.body)
      if (valid.invalid) return res.status(500).json({ error: 'invalid parameters' })
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
  }
}

export default budgetController
