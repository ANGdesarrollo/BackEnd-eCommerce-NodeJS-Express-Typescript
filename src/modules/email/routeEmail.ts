import { Router } from 'express';
import { ControllerEmail } from './controllerEmail';

export class EmailRouter {
  public router: Router;
  private readonly controllerEmail: ControllerEmail;

  constructor() {
    this.controllerEmail = new ControllerEmail();
    this.router = Router();
  }

  start(): Router {
    this.router.post('/', this.controllerEmail.sendEmail);
    return this.router;
  }
}
