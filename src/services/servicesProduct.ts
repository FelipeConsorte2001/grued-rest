import prisma from '../db/connect'
import { type IDelSucess } from '../types/IDelSucess.interface'
import { type IProduct } from '../types/IProduct.interface'

const servicesProduct = {
  createProduct: async (product: IProduct): Promise<IProduct> => {
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
  },
  findProduct: async (product: string): Promise<IProduct> => {
    try {
      const db = await prisma()
      const result = await db.products.findFirst({
        where: {
          name: product
        }
      })
      return result
    } catch (error: any) {
      return error
    }
  },
  findProducts: async (): Promise<IProduct> => {
    try {
      const db = await prisma()
      const result = await db.products.findMany({
        select: {
          name: true,
          description: true,
          amount: true,
          category_products_idCategoriaTocategory: {
            select: {
              name: true
            }
          }
        }
      })
      return result
    } catch (error: any) {
      return error
    }
  },
  updateProduct: async (identifier: number, product: IProduct): Promise<IProduct> => {
    try {
      const db = await prisma()
      const result = await db.products.update({
        where: {
          id: identifier
        },
        data: product
      })
      return result
    } catch (error: any) {
      return error
    }
  },
  deleteProduct: async (identifier: number): Promise<IDelSucess> => {
    try {
      const db = await prisma()
      await db.products.delete({
        where: {
          id: identifier
        }
      })
      return {
        success: 'product deleted'
      }
    } catch (error: any) {
      console.log(error)
      return error
    }
  }
}
export default servicesProduct
