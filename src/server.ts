import { Server } from './app';
import { env } from './config/envConfig/envConfig';
import { router } from './router';

const server = new Server(env.PORT, router);

server.listen();
