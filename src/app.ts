import express, { type Router } from 'express';
import cors from 'cors';
import compression from 'compression';
import { configCors } from './config/corsConfig/corsConfig';
import path from 'path';

export class Server {
  public app: express.Application;
  public port: number;
  public router: [{ router: Router; path: string }];

  constructor(port: number, router: [{ router: Router; path: string }]) {
    this.app = express();
    this.port = port;
    this.router = router;
    this.initializeRouters();
    this.initializeMiddleware();
  }

  private initializeMiddleware(): void {
    this.app.use(express.static(path.resolve(__dirname, '../client/build')));
    this.app.use(cors(configCors));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(compression());
  }

  private initializeRouters(): void {
    this.router.forEach((route: any) => this.app.use(route.path, route.router));
  }

  public listen(): void {
    this.app.listen(this.port, (): void => {
      console.log(`Server is listening on http://localhost:${this.port}`);
    });

    this.app.get('/', (_req, res) => {
      res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
    });
  }
}
