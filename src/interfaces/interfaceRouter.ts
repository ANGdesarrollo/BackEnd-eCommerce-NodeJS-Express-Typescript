import { type Router } from 'express';

export interface IRouter {
  router: Router;
  path: string;
}
