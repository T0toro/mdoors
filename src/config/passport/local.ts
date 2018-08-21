/**
 * Dependencies
 */

import { model } from 'mongoose';
import { Strategy } from 'passport-local';
import UserSchema from '../../models/User';

/**
 * Register model
 */

const User = model('User', UserSchema);

/**
 * Expo
 */

export default new Strategy({
  usernameField: 'login',
  passwordField: 'password',
}, (login, password, done) => {
  User.findOne({login: login}, (err, user) => {
    if (err) { return done(err); }

    if (!user) {
      return done(null, false, {
        message: 'Пользователя с таким login не зарегестрированно'
      });
    }

    if (user && !user.authenticate(user, password)) {
      return done(null, false, {
        message: 'Неверный пароль'
      });
    }

    return done(null, user);
  });
});
