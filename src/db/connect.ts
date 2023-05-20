import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function connect(): Promise<any> {
  return await prisma.$connect()

}