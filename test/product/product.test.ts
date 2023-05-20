import { expect, test } from '@jest/globals'
import { api } from '../../src/app'
import prisma from '../../src/db/connect'
import * as request from 'supertest'

describe('grud product', () => {
  beforeAll(async () => {
    await prisma()
  });


  test('must create a product', async () => {
    const category = await request.default(api)
      .post('/api/category')
      .send({ name: 'Computing' })
    const response = await request.default(api)
      .post('/api/product')
      .send({ name: 'monitor', description: 'some description', amount: 100.00, idCategoria: category.body.id })
    expect(response.status).toBe(200)
    expect(response.body.name).toBe('monitor');
    expect(response.body.idCategoria).toBe(category.body.id);
  })

  afterAll(async () => {
    await prisma().finally()
  })
})