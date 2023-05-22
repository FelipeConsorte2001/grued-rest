import prisma from '../db/connect'
import { type ICategory } from '../types/ICategory.interface'
import { type IDelSucess } from '../types/IDelSucess.interface'
const servicesCategory = {
  createCategory: async (category: ICategory): Promise<ICategory> => {
    try {
      const db = await prisma()
      const result = await db.category.create({
        data: category
      })
      return result
    } catch (error: any) {
      return error
    }
  },
  findCategory: async (category: string): Promise<ICategory> => {
    try {
      const db = await prisma()
      const result = await db.category.findFirst({
        where: {
          name: category
        }
      })
      return result
    } catch (error: any) {
      return error
    }
  },
  findCategorys: async (): Promise<ICategory> => {
    try {
      const db = await prisma()
      const result = await db.category.findMany({
        select: {
          name: true,
          fee: true
        }
      })
      return result
    } catch (error: any) {
      return error
    }
  },
  deleteCategory: async (category: number): Promise<IDelSucess> => {
    try {
      const db = await prisma()
      await db.category.delete({
        where: {
          id: category
        }
      })
      return {
        success: 'category deleted'
      }
    } catch (error: any) {
      return error
    }
  },
  updateCategory: async (identifier: number, category: ICategory): Promise<ICategory> => {
    try {
      const db = await prisma()
      const result = await db.category.update({
        where: {
          id: identifier
        },
        data: category
      })
      return result
    } catch (error: any) {
      return error
    }
  }
}
export default servicesCategory
