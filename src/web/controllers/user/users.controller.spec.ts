import 'reflect-metadata'

import { App } from '../../application'
import 'dotenv/config'

import supertest from 'supertest'

const app = new App()
const request = supertest(app.getserver())

// Example of how to setup E2E tests
describe('Users Controller', () => {
  beforeAll(async (done) => {
    done()
  })

  it('returns a 201 on successful signup', async () => {
    return request
      .post('/api/v1/user')
      .send({
        email: 'test@test.com',
        username: 'test',
        password: 'password',
        role: 'user',
      })
      .expect(201)
  })

  it('returns a 400 with an invalid email', async () => {
    return request
      .post('/api/v1/user')
      .send({
        email: 'invalid.com',
        username: 'test',
        password: 'password',
        role: 'user',
      })
      .expect(400)
  })

  it('returns a 400 with an invalid username', async () => {
    return request
      .post('/api/v1/user')
      .send({
        email: 'test@test.com',
        username: 't',
        password: '1245678',
        role: 'user',
      })
      .expect(400)
  })

  it('returns a 400 with an invalid password', async () => {
    return request
      .post('/api/v1/user')
      .send({
        email: 'test@test.com',
        username: 'test',
        password: '12',
        role: 'user',
      })
      .expect(400)
  })
  it('returns a 400 with an invalid role', async () => {
    return request
      .post('/api/v1/user')
      .send({
        email: 'test@test.com',
        username: 'test',
        password: '12345678',
        role: 'false',
      })
      .expect(400)
  })
  it('returns a 400 with missing email, username and password', async () => {
    return request.post('/api/v1/user').send({}).expect(400)
  })

  it('disallows duplicate emails', async () => {
    await request
      .post('/api/v1/user')
      .send({
        email: 'test@test.com',
        username: 'test',
        password: 'password',
        role: 'user',
      })
      .expect(201)

    await request
      .post('/api/v1/user')
      .send({
        email: 'test@test.com',
        username: 'test2',
        password: 'password',
        role: 'user',
      })
      .expect(400)
  })

  it('disallows duplicate username', async () => {
    await request
      .post('/api/v1/user')
      .send({
        email: 'test@test.com',
        username: 'test',
        password: 'password',
        role: 'user',
      })
      .expect(201)

    await request
      .post('/api/v1/user')
      .send({
        email: 'test2@test.com',
        username: 'test',
        password: 'password',
        role: 'user',
      })
      .expect(400)
  })

  it('sets a cookie after successful signup', async () => {
    const response = await request
      .post('/api/v1/user')
      .send({
        email: 'test@test.com',
        username: 'test',
        password: 'password',
        role: 'user',
      })
      .expect(201)

    expect(response.get('Set-Cookie')).toBeDefined()
  })

  afterEach(async (done) => {
    // await artsModel.deleteMany()
    done()
  })
})
