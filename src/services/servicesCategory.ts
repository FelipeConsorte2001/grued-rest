import prisma from '../db/connect'
import { ICategory } from '../types/ICategory.interface'
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
  }
}
export default servicesCategory
