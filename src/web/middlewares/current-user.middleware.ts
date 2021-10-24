import { Jwt } from "../../logic/dtos/users";
import { NotAuthenticated } from "../exceptions/Not-authenticated";
import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      currentUser?: Jwt;
    }
  }
}
export const CurrentUserMiddleware = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    next(new NotAuthenticated());
  } else {
    const payload = await Jwt.verifyToken(req.session?.jwt);
    req.currentUser! = payload;
    next();
  }
};
