import dotenv from 'dotenv';
import { type IconfigIterface } from './envConfigInterface';
dotenv.config();

if (!process.env.NODE_ENV) {
  throw new Error('Enviroment not properly set. NODE_ENV not set');
}

if (!process.env.PORT) {
  throw new Error('Enviroment not properly set. PORT not set');
}

if (!process.env.SECRET_KEY) {
  throw new Error('Enviroment not properly set. SECRET_KEY not set');
}

if (!process.env.DB_CONNECTION) {
  throw new Error('Enviroment not properly set. DB_CONNECTION not set');
}

if (!process.env.PERMISSION_REQUEST) {
  throw new Error('Enviroment not properly set. PERMISSION_REQUEST not set');
}

export const env: IconfigIterface = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: Number(process.env.PORT),
  SECRET_KEY: process.env.SECRET_KEY,
  DB_CONNECTION: process.env.DB_CONNECTION,
  PERMISSION_REQUEST: process.env.PERMISSION_REQUEST,
};
