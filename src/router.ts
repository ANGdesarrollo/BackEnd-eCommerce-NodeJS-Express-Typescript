import { type IRouter } from './interfaces/interfaceRouter';
import { AuthRouter } from './modules/user/routeUser';
import { ProductRouter } from './modules/products/routeProducts';

export const router: IRouter[] = [
  { router: new AuthRouter().start(), path: '/user' },
  { router: new ProductRouter().start(), path: '/product' },
];
