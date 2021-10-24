import { Request, Response } from 'express'
import { controller, httpGet, httpPost } from 'inversify-express-utils'

@controller('/')
export class HelloController {
  constructor() {}

  @httpGet('/')
  async hello(req: any, res: Response) {
    const response = 'hello'
    res.json(response)
  }
}
