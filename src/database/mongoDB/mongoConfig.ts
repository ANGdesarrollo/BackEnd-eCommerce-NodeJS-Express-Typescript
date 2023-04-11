import mongoose from 'mongoose';
import { env } from '../../config/envConfig/envConfig';
import { logger } from '../../config/winstonConfig/winstonConfig';
import session from 'express-session';
import MongoStore from 'connect-mongo';

mongoose.set('strictQuery', false);

interface optionsCookie {
  maxAge: number;
  secure?: boolean;
  sameSite?: any;
}

export const dbConnection = (): void => {
  const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 30000,
    keepAlive: true,
    maxPoolSize: 40,
    autoIndex: false,
  };

  mongoose
    .connect(env.DB_CONNECTION, options)
    .then(() => logger.info('Database MongoDB online'))
    .catch((error) => {
      logger.error(`Database error: ${String(error)}`);
      throw Error(`Database error: ${String(error)}`);
    });
};

const optionsCookies = (): optionsCookie => {
  if (env.PERSISTENCE === 'PRODUCTION') {
    const cookie = {
      maxAge: 60 * 10000,
      secure: true,
      sameSite: 'none',
    };
    return cookie;
  } else {
    const cookie = {
      maxAge: 60 * 10000,
    };
    return cookie;
  }
};

export const sessionMongo = (): any => {
  try {
    const sessionCookies = session({
      store: new MongoStore({
        mongoUrl: env.DB_CONNECTION,
      }),
      secret: env.SECRET_KEY,
      resave: false,
      saveUninitialized: false,
      rolling: true,
      cookie: optionsCookies(),
    });
    logger.log('info', 'Session MongoDB online');
    return sessionCookies;
  } catch (err) {
    logger.info('error', `${String(err)}`);
  }
};
