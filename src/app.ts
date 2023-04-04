import express from 'express';
import cors from 'cors';
import compression from 'compression';
import { configCors } from './config/corsConfig/corsConfig';
import path from 'path';
import { logger } from './config/winstonConfig/winstonConfig';
import { type IRouter } from './interfaces/interfaceRouter';
import { dbConnection, sessionMongo } from './database/mongoDB/mongoConfig';
import passport from 'passport';
import { passportLocalLogin, passportLocalRegister } from './middlewares/passport';
import UserModel from './modules/user/modelUser';

export class Server {
  public app: express.Application;
  public port: number;
  public router: IRouter[];

  constructor(port: number, router: IRouter[]) {
    this.app = express();
    this.port = port;
    this.router = router;
    this.initializeDB();
    this.initializeMiddleware();
    this.initializeRouters();
  }

  public initializeMiddleware(): void {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(path.resolve(__dirname, '../client/dist')));
    this.app.use(cors(configCors));
    this.app.use(compression());
    this.app.use(sessionMongo());

    passport.serializeUser((user: any, done): any => {
      done(null, user._id);
    });
    passport.deserializeUser((id, done): any => UserModel.findById(id, done));
    passport.use('signup', passportLocalRegister);
    passport.use('login', passportLocalLogin);

    this.app.use(passport.session());
    this.app.use(passport.initialize());
  }

  public initializeDB = (): void => {
    dbConnection();
  };

  public initializeRouters(): void {
    this.router.forEach((route: IRouter) => this.app.use(route.path, route.router));
  }

  public listen(): void {
    this.app.listen(this.port, (): void => {
      logger.info(`Server is listening on http://localhost:${this.port}`);
    });
  }
}
