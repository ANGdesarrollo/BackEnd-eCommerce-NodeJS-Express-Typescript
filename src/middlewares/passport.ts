import bCrypt from 'bcrypt';
import UserModel from '../modules/user/modelUser';
import { useValidators } from '../utils/validators/useValidators';
import { logger } from '../config/winstonConfig/winstonConfig';
import { date } from '../utils/date/date';
import passportLocal from 'passport-local';
import { type IUserDTO, type IUser } from '../interfaces/interfaceUser';
import DaosUser from '../modules/user/userDaosFactory';
import { env } from '../config/envConfig/envConfig';

const LocalStrategy = passportLocal.Strategy;
const { emailValidator } = useValidators();
const createHash = (password: string): string => bCrypt.hashSync(password, bCrypt.genSaltSync(10));

const isValidPassword = (user: IUser, password: string): boolean => bCrypt.compareSync(password, user.password);

export const passportLocalLogin = new LocalStrategy((username, password, done) => {
  void DaosUser.findOne({ username }, (err: ErrorCallback, data: IUser) => {
    if (err) {
      done(err);
      return;
    }
    if (!data) {
      done(null, false);
      return;
    }
    if (!isValidPassword(data, password)) {
      done(null, false);
      return;
    }
    done(null, data);
  });
});

export const passportLocalRegister = new LocalStrategy(
  {
    passReqToCallback: true,
  },
  (req, username, password, done) => {
    void DaosUser.findOne({ username }, function (err: ErrorCallback, user: IUserDTO) {
      if (err) {
        logger.error(`Error in SignUp ${String(err)}`);
        done(err);
        return;
      }
      if (user) {
        logger.info('User already exists');
        done(null, false);
        return;
      }

      if (!emailValidator(username)) {
        logger.info('Email is invalid');
        done(null, false);
        return;
      }

      if (password.length < 3) {
        done(null, false);
        return;
      }

      const isAdmin = req.body.secretKey === env.SECRET_ADMIN_KEY;

      const newUser: IUser = new UserModel({
        date: date(),
        username,
        password: createHash(password),
        admin: isAdmin,
      });

      DaosUser.save(newUser)
        .then((userWithId) => {
          logger.info('User Registration successful');
          done(null, userWithId);
        })
        .catch((err: any) => {
          logger.error(`Error in Saving user ${String(err)}`);
          done(err);
        });
    });
  },
);
