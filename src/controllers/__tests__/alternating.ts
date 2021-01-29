import request from 'supertest'
import { Express } from 'express-serve-static-core'
import { createServer } from '../../util/server'

let server: Express

beforeAll(async () => {
  server = await createServer()
})

describe('GET /alternating-caps', () => {
  it('should return 200 and an alternating caps text if query param text is provided', async done => {
    request(server)
      .get('/api/v1/alternating-caps?text=hello')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).toMatchObject({ text: 'HeLlO' })
        done()
      })
  })

  it('should return 400 if no text query param is provided', async done => {
    request(server)
      .get('/api/v1/alternating-caps')
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })

  it('should return 400 if and invalid query param is provided', async done => {
    request(server)
      .get('/api/v1/alternating-caps?text=hi&thisapi=useless')
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })
})
