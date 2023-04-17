import { type IRouter } from './interfaces/interfaceRouter';
import { AuthRouter } from './modules/user/routeUser';
import { ProductRouter } from './modules/products/routeProducts';
import { EmailRouter } from './modules/email/routeEmail';

export const router: IRouter[] = [
  { router: new AuthRouter().start(), path: '/user' },
  { router: new ProductRouter().start(), path: '/products' },
  { router: new EmailRouter().start(), path: '/email'},
];
