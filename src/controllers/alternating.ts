import * as express from 'express'
const altCase = require('alternating-case')

export function alternatingCaps(req: express.Request, res: express.Response): void {
  const text = req.query.text
  res.json({
    "text": altCase(text)
  })
}
