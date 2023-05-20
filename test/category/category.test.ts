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

  afterAll(async () => {
    await prisma().finally()
  })
})