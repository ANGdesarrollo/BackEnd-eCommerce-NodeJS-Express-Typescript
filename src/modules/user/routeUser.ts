import { ControllerUser } from './controllerUser';
import { Router } from 'express';
import passport from 'passport';

export class AuthRouter {
  public router: Router;
  private readonly controllerAuth: ControllerUser;

  constructor() {
    this.controllerAuth = new ControllerUser();
    this.router = Router();
  }

  start(): Router {
    this.router.post('/register', passport.authenticate('signup'), this.controllerAuth.saveUser);
    this.router.post('/login', passport.authenticate('login'), this.controllerAuth.loginUser);
    return this.router;
  }
}
