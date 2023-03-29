import { env } from '../envConfig/envConfig';
import { type IcorsConfig } from './interfaceCorsConfig';

export const configCors: IcorsConfig = {
  origin: env.PERMISSION_REQUEST,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};
