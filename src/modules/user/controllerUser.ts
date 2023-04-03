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
      throw new Error(`Error at creating user: ${String(err)}`);
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
      throw new Error(`Error at log in user: ${String(err)}`);
    }
  }
}
