import { Router, type Request, type Response } from 'express';

export class AuthRouter {
  public path: string = '/';
  public router: Router = Router();

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    // this.controllerAuth = new ControllerAuth();
  }

  start(): Router {
    this.router.get(this.path, (_req: Request, res: Response) => {
      return res.json({
        name: 'Alexis',
      });
    });
    return this.router;
  }
}
