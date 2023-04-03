// @ts-nocheck
import bCrypt from 'bcrypt';
import UserModel from '../modules/user/modelUser';
import { useValidators } from '../utils/validators/useValidators';
import { logger } from '../config/winstonConfig/winstonConfig';
import { date } from '../utils/date/date';
import passportLocal from 'passport-local';

const LocalStrategy = passportLocal.Strategy;
const { emailValidator } = useValidators();
const createHash = (password): string => bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);

const isValidPassword = (user, password): boolean => bCrypt.compareSync(password, user.password);

export const passportLocalLogin = new LocalStrategy((username, password, done) => {
  void UserModel.findOne({ username }, (err, user) => {
    if (err) {
      done(err);
      return;
    }
    if (!user) {
      done(null, false);
      return;
    }
    if (!isValidPassword(user, password)) {
      done(null, false);
      return;
    }
    done(null, user);
  });
});

export const passportLocalRegister = new LocalStrategy(
  {
    passReqToCallback: true,
  },
  (req, username, password, done) => {
    void UserModel.findOne({ username }, function (err, user) {
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

      const newUser = new UserModel({
        date: date(),
        username,
        password: createHash(password),
        admin: req.body.admin,
      });
      console.log(req.body.admin)
      console.log('soy new user', newUser);

      // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
      void UserModel.create(newUser, (err, userWithId) => {
        if (err) {
          logger.error(`Error in Saving user ${String(err)}`);
          done(err);
          return;
        }
        logger.info('User Registration successful');
        done(null, userWithId);
      });
    });
  },
);
