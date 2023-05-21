import { expect, test } from '@jest/globals'
import { api } from '../../src/app'
import prisma from '../../src/db/connect'
import * as request from 'supertest'
import { type IProduct } from '../../src/types/IProduct.interface'

describe('grud product', () => {
  let category: any
  beforeAll(async () => {
    await prisma()
    category = await request.default(api)
      .post('/api/category')
      .send({ name: 'Computing' })
  })

  test('must create a product', async () => {
    const response = await request.default(api)
      .post('/api/product')
      .send({ name: 'monitor', description: 'some description', amount: 100.00, idCategoria: category.body.id })
    expect(response.status).toBe(200)
    expect(response.body.name).toBe('monitor')
    expect(response.body.idCategoria).toBe(category.body.id)
  })
  test('get all products', async () => {
    await request.default(api)
      .post('/api/product')
      .send({ name: 'TV', description: 'some description', amount: 100.00, idCategoria: category.body.id })
    const response = await request.default(api)
      .get('/api/product/')
    expect(response.status).toBe(200)
    expect(response.body.length).toBeGreaterThan(0)
    expect(response.body[0]).toHaveProperty('category_products_idCategoriaTocategory')
  })

  test('must pick up a product by name', async () => {
    const product = await request.default(api)
      .post('/api/product')
      .send({ name: 'TV', description: 'some description', amount: 100.00, idCategoria: category.body.id })
    const response = await request.default(api)
      .get(`/api/product/${product.body.name}`)
    expect(response.status).toBe(200)
    expect(response.body.name).toBe('TV')
    expect(response.body.description).toBe('some description')
  })
  test('must update a product', async () => {
    const product = await request.default(api)
      .post('/api/product')
      .send({ name: 'TV', description: 'some description', amount: 100.00, idCategoria: category.body.id })
    const response = await request.default(api)
      .put(`/api/product/${product.body.id}`)
      .send({ name: 'TV', description: 'descripton update', amount: 105.00, idCategoria: category.body.id })
    expect(response.status).toBe(200)
    expect(response.body.name).toBe('TV')
    expect(response.body.description).toBe('descripton update')
  })
  test('must delete a product', async () => {
    const product = await request.default(api)
      .post('/api/product')
      .send({ name: 'product del', description: 'some description', amount: 100.00, idCategoria: category.body.id })
    const response = await request.default(api)
      .delete(`/api/product/${product.body.id}`)
    expect(response.status).toBe(200)
    expect(response.body.success).toBe('product deleted')
  })
  test('must delete a product', async () => {
    const product = await request.default(api)
      .post('/api/product')
      .send({ name: 'product del', description: 'some description', amount: 100.00, idCategoria: category.body.id })
    const response = await request.default(api)
      .delete(`/api/product/${product.body.id}`)
    expect(response.status).toBe(200)
    expect(response.body.success).toBe('product deleted')
  })
  afterAll(async () => {
    await prisma().finally()
  })
})
describe('validating product parameters', () => {
  let valideProduct: IProduct
  let category: any
  beforeAll(async () => {
    await prisma()
    category = await request.default(api)
      .post('/api/category')
      .send({ name: 'Computing' })
    valideProduct = { name: 'TV', description: 'some description', amount: 100.00, idCategoria: category.body.id }
  })

  const testTemplate = async (newData: any, errorMessage: string): Promise<void> => {
    const response = await request.default(api)
      .post('/api/product')
      .send({ ...valideProduct, ...newData })
    expect(response.status).toBe(500)
    expect(response.body.error).toBe(errorMessage)
  }
  test('you must not enter a product without a name', async (): Promise<void> => { await testTemplate({ name: null }, 'invalid parameters') })
  test('you must not enter a product without a description', async (): Promise<void> => { await testTemplate({ description: null }, 'invalid parameters') })
  test('you must not enter a product without a amount', async (): Promise<void> => { await testTemplate({ amount: null }, 'invalid parameters') })
  test('you must not enter a product without a categoria', async (): Promise<void> => { await testTemplate({ idCategoria: null }, 'invalid parameters') })
  afterAll(async () => {
    await prisma().finally()
  })
})
describe('validating parameters to update the product', () => {
  let valideProduct: IProduct
  let category: any
  let product: any
  beforeAll(async () => {
    await prisma()
    category = await request.default(api)
      .post('/api/category')
      .send({ name: 'Computing' })
    valideProduct = { name: 'TV invalid', description: 'some description', amount: 100.00, idCategoria: category.body.id }
    product = await request.default(api)
      .post('/api/product')
      .send(valideProduct)
  })
  const testTemplate = async (newData: any, errorMessage: string): Promise<void> => {
    const response = await request.default(api)
      .put(`/api/product/${product.body.id}`)
      .send({ ...valideProduct, ...newData })
    expect(response.status).toBe(500)
    expect(response.body.error).toBe(errorMessage)
  }
  test('you must not enter a product without a name', async () => { await testTemplate({ name: null }, 'invalid parameters') })
  test('you must not enter a product without a description', async () => { await testTemplate({ description: null }, 'invalid parameters') })
  test('you must not enter a product without a amount', async () => { await testTemplate({ amount: null }, 'invalid parameters') })
  test('you must not enter a product without a categoria', async () => { await testTemplate({ idCategoria: null }, 'invalid parameters') })
})
