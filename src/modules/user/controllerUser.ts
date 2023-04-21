import { logger } from '../../config/winstonConfig/winstonConfig';
import { type Request, type Response } from 'express';
import { type IUserController } from '../../interfaces/interfaceUser';

export class ControllerUser {
  saveUser(_req: Request, res: Response): void {
    try {
      res.status(201).json({
        status: true,
        message: 'User successfully registered',
      });
    } catch (err) {
      logger.error(`Error at creating user: ${String(err)}`);
      throw new Error();
    }
  }

  loginUser(req: Request, res: Response): void {
    try {
      const user = req.user as IUserController;
      res.status(201).json({
        status: true,
        message: 'User successfully logged in',
        username: user.username,
        isAdmin: user.admin,
      });
    } catch (err) {
      logger.error(`Error at log in user: ${String(err)}`);
      throw new Error();
    }
  }

  authUser(req: Request, res: Response): void {
    try {
      const user = req.user as IUserController;
      console.log(user);
      res.status(200).json({
        status: true,
        message: 'User is auth',
        username: user.username,
        isAdmin: user.admin,
      });
    } catch (error) {
      logger.error(`Error at authUser: ${(error)}`);
      throw new Error();
    }
  }

  logoutUser(req: Request, res: Response): void {
    try {
      req.logout((err) => {
        if (err) {
          res.json({
            status: false,
            message: 'User logout failed',
          });
        } else {
          res.json({
            status: true,
            message: 'User successfully logged out',
          });
        }
      });
    } catch (error) {
      logger.error(`Error at logoutUser: ${(error)}`);
      throw new Error();
    }
  }
}
