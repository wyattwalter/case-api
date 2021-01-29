import * as express from 'express'

export function alternatingCaps(req: express.Request, res: express.Response): void {
  const text = req.query.text
  res.json({
    "text": text
  })
}
