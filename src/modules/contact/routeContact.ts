import { Router } from 'express';
import { ControllerContact } from './controllerContact';

export class ContactRouter {
  public router: Router;
  private readonly controllerContact: ControllerContact;

  constructor() {
    this.controllerContact = new ControllerContact();
    this.router = Router();
  }

  start(): Router {
    this.router.post('/', this.controllerContact.sendEmail);
    return this.router;
  }
}
