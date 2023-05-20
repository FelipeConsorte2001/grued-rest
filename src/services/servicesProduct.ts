import prisma from '../db/connect'
import { IProduct } from '../types/IProduct.interface'

const servicesProduct = {
  createProduct: async (product: IProduct): Promise<IProduct> => {
    try {
      const db = await prisma()
      const result = await db.products.create({
        data: product
      })
      return result
    } catch (error: any) {
      return error
    }
  },
  findProduct: async (product: String): Promise<IProduct> => {
    try {
      const db = await prisma()
      const result = await db.products.findFirst({
        where: {
          name: product
        }
      })
      return result
    } catch (error: any) {
      console.log(error)
      return error
    }
  }
}
export default servicesProduct
