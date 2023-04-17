import { env } from '../envConfig/envConfig';

export const configCors = {
  origin: env.PERMISSION_REQUEST.split(','),
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

export const corsSocket = {
  origin: env.PERMISSION_REQUEST.split(','),
  credentials: true,
};
