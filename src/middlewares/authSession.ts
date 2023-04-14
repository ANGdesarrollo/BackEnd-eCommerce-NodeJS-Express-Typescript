import { type NextFunction, type Request, type Response } from 'express';

export const authSession = (req: Request, res: Response, next: NextFunction): void => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.json({
      status: false,
    });
  }
};
