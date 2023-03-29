import { Server } from './app';
import { AuthRouter } from './modules/auth/routeAuth';
import { env } from './config/envConfig/envConfig';
import { dbConection } from './database/mongoDB/config';

const server = new Server(env.PORT, [
  { router: new AuthRouter().start(), path: '/auth' },
]);

dbConection();
server.listen();
