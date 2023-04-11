import { NextFunction, Request, Response } from 'express';

export const authSession = (req: Request, _res: Response, next: NextFunction): void => {
  if (req.isAuthenticated()) {
    next();
  }
};
