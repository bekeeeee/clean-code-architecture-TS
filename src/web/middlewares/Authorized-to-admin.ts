import { NotAuthorized } from '../exceptions/Not-authorized'
import { Request, Response, NextFunction } from 'express'

export const AuthorizedToAdmin = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  if (req.currentUser?.role !== 'admin') {
    next(new NotAuthorized())
  } else next()
}
