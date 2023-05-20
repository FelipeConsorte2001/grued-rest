import prisma from '../db/connect'

const servicesProduct = {
  createProduct: async (product: any): Promise<any> => {
    try {
      const db = await prisma()
      const result = await db.products.create({
        data: product
      })
      return result
    } catch (error: any) {
      console.log(error)
      return error
    }
  }
}
export default servicesProduct
