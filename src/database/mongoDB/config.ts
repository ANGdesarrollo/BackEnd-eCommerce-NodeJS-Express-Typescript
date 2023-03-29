import mongoose from 'mongoose';
import { env } from '../../config/envConfig/envConfig';
import { logger } from '../../config/winstonConfig/winstonConfig';

mongoose.set('strictQuery', false);

export const dbConection = async (): Promise<void> => {
  try {
    const options = {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      socketTimeoutMS: 30000,
      keepAlive: true,
      maxPoolSize: 40,
      autoIndex: false,
    };

    await mongoose.connect(env.DB_CONNECTION, options);

    logger.info('Database successfully connected');
  } catch (error) {
    logger.error(`Database error: ${String(error)}`);
    throw Error(`Database error: ${String(error)}`);
  }
};
