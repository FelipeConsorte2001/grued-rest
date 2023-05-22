import { expect, test } from '@jest/globals'
import { api } from '../../src/app'
import prisma from '../../src/db/connect'
import * as request from 'supertest'
import { type IProduct } from '../../src/types/IProduct.interface'

describe('create budget', () => {
  let valideProduct: IProduct
  let category: any
  let product: any
  beforeAll(async () => {
    await prisma()
    category = await request.default(api)
      .post('/api/category')
      .send({ name: 'Computing' })
    valideProduct = { name: `tv ${new Date()}`, description: 'some description', amount: 100.00, idCategoria: category.body.id, quantity: 10 }
    product = await request.default(api)
      .post('/api/product')
      .send(valideProduct)
  })
  test('create budget', async () => {
    const response = await request.default(api)
      .post('/api/budget')
      .send({
        quantity: 2,
        products: {
          name: product.body.name,
          installment: 2,
          amount: product.body.amount,
          category: category.body.name
        }
      })
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('value')
    expect(response.body.quantity).toBe(2)
    expect(response.body.total).toBeGreaterThan(Number(product.body.amount))
  })

  afterAll(async () => {
    await prisma().finally()
  })
})
describe('validate budget', () => {
  let valideBudget: any
  let category: any
  let product: any
  beforeAll(async () => {
    await prisma()
    category = await request.default(api)
      .post('/api/category')
      .send({ name: 'Computing', fee: '5' })
    product = await request.default(api)
      .post('/api/product')
      .send({ name: `tv ${new Date()}`, description: 'some description', amount: 100.00, idCategoria: category.body.id, quantity: 10 })
    valideBudget = {
      quantity: 2,
      products: {
        name: product.body.name,
        installment: 2,
        amount: product.body.amount,
        category: category.body.name
      }
    }
    product = await request.default(api)
      .post('/api/product')
      .send(valideBudget)
  })
  const testTemplate = async (newData: any, errorMessage: string): Promise<void> => {
    const response = await request.default(api)
      .post('/api/budget')
      .send({ ...valideBudget, ...newData })
    expect(response.status).toBe(500)
    expect(response.body.error).toBe(errorMessage)
  }
  test('you cannot create a budget without quantity', async (): Promise<void> => { await testTemplate({ quantity: null }, 'invalid parameters') })
  test('you cannot with a quantity larger than the stock', async (): Promise<void> => { await testTemplate({ quantity: 50 }, 'invalid parameters') })
  test('you cannot create a budget without category', async (): Promise<void> => { await testTemplate({ products: { category: null } }, 'invalid parameters') })
  test('you cannot create a budget without amount', async (): Promise<void> => { await testTemplate({ products: { amount: null } }, 'invalid parameters') })

  afterAll(async () => {
    await prisma().finally()
  })
})
