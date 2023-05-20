import { expect, test } from '@jest/globals'
import { api } from '../../src/app'
import prisma from '../../src/db/connect'
import * as request from 'supertest'


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
    expect(response.body.name).toBe('monitor');
    expect(response.body.idCategoria).toBe(category.body.id);
  })

  test('must pick up a product by name', async () => {
    const product = await request.default(api)
      .post('/api/product')
      .send({ name: 'TV', description: 'some description', amount: 100.00, idCategoria: category.body.id })
    const response = await request.default(api)
      .get(`/api/product/${product.body.name}`)
    expect(response.status).toBe(200)
    expect(response.body.name).toBe('TV');
    expect(response.body.description).toBe('some description');
  })

  afterAll(async () => {
    await prisma().finally()
  })
})