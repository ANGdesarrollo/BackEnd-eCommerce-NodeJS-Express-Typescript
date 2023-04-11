import { type NextFunction, type Request, type Response } from 'express';

export const authSession = (req: Request, _res: Response, next: NextFunction): void => {
  if (req.isAuthenticated()) {
    next();
  } else {
    throw new Error('Auth error');
  }
};
