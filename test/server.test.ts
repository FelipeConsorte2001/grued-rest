import { expect, test } from '@jest/globals'
import { api } from '../src/app'
import * as request from 'supertest'

test('Must return on port 3000', async () => {
  const response = await request.default(api).get('/')
  expect(response.status).toBe(200)
})
