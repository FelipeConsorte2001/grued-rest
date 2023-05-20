import { expect, test } from '@jest/globals'
import { api } from '../../src/app'
import prisma from '../../src/db/connect'
import * as request from 'supertest'

describe('grud category', () => {
  beforeAll(async () => {
    await prisma()
  });


  test('must create a category', async () => {
    const response = await request.default(api)
      .post('/api/category')
      .send({ name: 'Computing' })
    expect(response.status).toBe(200)
    expect(response.body.name).toBe('Computing');
  })

  test('must create meets a category', async () => {
    const response = await request.default(api)
      .get('/api/category/Computing')
    expect(response.status).toBe(200)
    expect(response.body.name).toBe('Computing');
  })

  test('validates category parameters', async () => {
    const response = await request.default(api)
      .post('/api/category')
      .send({ name: 'ivalid' })
    expect(response.status).toBe(500)
    expect(response.body.error).toBe('invalid parameter');
  })
  test('must delete a category', async () => {
    const category = await request.default(api)
      .post('/api/category')
      .send({ name: 'Computing' })
    const response = await request.default(api)
      .delete(`/api/category/${category.body.id}`)
    expect(response.status).toBe(200)
    expect(response.body.success).toBe('category deleted');
  })
  test('must maintain a category', async () => {
    const category = await request.default(api)
      .post('/api/category')
      .send({ name: 'Computing' })
    const response = await request.default(api)
      .put(`/api/category/${category.body.id}`)
      .send({ name: 'Automotive' })
    console.log(response.body)
    expect(response.status).toBe(200)
    expect(response.body.name).toBe('Automotive');
  })
  afterAll(async () => {
    await prisma().finally()
  })
})