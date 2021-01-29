import request from 'supertest'
import {Express} from 'express-serve-static-core'
import {createServer} from '../../util/server'

let server: Express

beforeAll(async () => {
  server = await createServer()
})

describe('GET /alternating-caps', () => {
  it('should return 200 and an alternating caps text if query param text is provided', async done => {
    request(server)
      .get(`/api/v1/alternating-caps?text=hello`)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err)
        expect(res.body).toMatchObject({'text': 'HeLlO'})
        done()
      })
  })

  it('should return 400 if text query param is not able to be converted to a string', async done => {
    request(server)
      .get(`/api/v1/alternating-caps?text=1234`)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err)
        done()
      })
  })
})