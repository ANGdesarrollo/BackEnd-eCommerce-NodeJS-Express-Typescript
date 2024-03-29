import { ServerApp } from './app';
import { env } from './config/envConfig/envConfig';
import { router } from './router';

const server = new ServerApp(env.PORT, router);

server.listen();
