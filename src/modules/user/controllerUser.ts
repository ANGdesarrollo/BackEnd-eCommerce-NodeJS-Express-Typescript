import { logger } from '../../config/winstonConfig/winstonConfig';
import {type Request, type Response} from 'express';

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

  loginUser(_req: Request, res: Response): void {
    try {
      res.status(201).json({
        status: true,
        message: 'User successfully logged in',
      });
    } catch (err) {
      logger.error(`Error at log in user: ${String(err)}`);
      throw new Error();
    }
  }

  authUser(req: Request, res: Response): void {
    try {
      res.status(200).json({
        status: true,
        message: 'User is auth',
        username: req.user,
      });
    } catch (error) {
      logger.error(`Error at authUser: ${String(error)}`);
      throw new Error();
    }
  }

  logoutUser(req: Request, res: Response): void {
    try {
      req.logout((err) => {
        if(err) {
          res.json({
            status: false,
            message: 'User logout failed'
          })
        } else {
          res.json({
            status: true,
            message: "User successfully logged out"
          })
        }
      })
    } catch (error) { 
      logger.error(`Error at logoutUser: ${String(error)}`);
      throw new Error();
    }
  }
}
