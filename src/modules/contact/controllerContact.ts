import { type Request, type Response } from 'express';
import { logger } from '../../config/winstonConfig/winstonConfig';
import { ServiceContact } from './serviceContact';

export class ControllerContact {
  public serviceContact: ServiceContact;

  constructor() {
    this.serviceContact = new ServiceContact();
  }

  sendEmail = async (req: Request, res: Response): Promise<void> => {
    try {
      const { data } = req.body;
      await this.serviceContact.sendEmailService(data);
      res.status(201).json({
        status: true,
        message: 'Message successfully sent',
      });
    } catch (error) {
      logger.error(`Error at controller sendEmail: ${String(error)}`);
      throw new Error();
    }
  };
}
