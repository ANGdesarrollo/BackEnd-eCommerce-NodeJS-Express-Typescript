import { ControllerUser } from './controllerUser';
import { Router } from 'express';
import passport from 'passport';
import { authSession } from '../../middlewares/authSession';

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
    this.router.get('/authSession', authSession, this.controllerAuth.authUser);
    this.router.delete('/logout', this.controllerAuth.logoutUser);
    return this.router;
  }
}
