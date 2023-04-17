import { type IRouter } from './interfaces/interfaceRouter';
import { AuthRouter } from './modules/user/routeUser';
import { ProductRouter } from './modules/products/routeProducts';
import { ContactRouter } from './modules/contact/routeContact';

export const router: IRouter[] = [
  { router: new AuthRouter().start(), path: '/user' },
  { router: new ProductRouter().start(), path: '/products' },
  { router: new ContactRouter().start(), path: '/contact'},
  { router: new ContactRouter().start(), path: '/contact'},
];
