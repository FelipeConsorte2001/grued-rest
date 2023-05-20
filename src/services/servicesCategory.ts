import prisma from '../db/connect'
import { ICategory } from '../types/ICategory.interface'
import { IDelCategory } from '../types/IDelCategory.interface'
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
  findCategory: async (category: String): Promise<ICategory> => {
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
  deleteCategory: async (category: Number): Promise<IDelCategory> => {
    try {
      const db = await prisma()
      const result = await db.category.delete({
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
  updateCategory: async (identifier: Number, category: ICategory): Promise<ICategory> => {
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
