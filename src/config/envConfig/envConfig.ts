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

if (!process.env.PERSISTENCE) {
  throw new Error('Enviroment not properly set. PERSISTENCE not set');
}

if (!process.env.SECRET_ADMIN_KEY) {
  throw new Error('Enviroment not properly set. SECRET_ADMIN_KEY not set');
}

if (!process.env.PASS_NODEMAILER) {
  throw new Error('Enviroment not properly set. PASS_NODEMAILER not set');
}

if (!process.env.ACCOUNT_SID) {
  throw new Error('Enviroment not properly set. ACCOUNT_SID not set');
}

if (!process.env.ACCOUNT_TOKEN) {
  throw new Error('Enviroment not properly set. ACCOUNT_TOKEN not set');
}

export const env: IconfigIterface = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: Number(process.env.PORT),
  SECRET_KEY: process.env.SECRET_KEY,
  DB_CONNECTION: process.env.DB_CONNECTION,
  PERMISSION_REQUEST: process.env.PERMISSION_REQUEST,
  PERSISTENCE: process.env.PERSISTENCE,
  SECRET_ADMIN_KEY: process.env.SECRET_ADMIN_KEY,
  PASS_NODEMAILER: process.env.PASS_NODEMAILER,
  ACCOUNT_SID: process.env.ACCOUNT_SID,
  ACCOUNT_TOKEN: process.env.ACCOUNT_TOKEN,
};
