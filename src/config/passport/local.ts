'use strict';

/**
 * Module dependencies.
 */

let mongoose, User, LocalStrategy;

/**
 * Module dependencies.
 */

mongoose = require('mongoose');
LocalStrategy = require('passport-local').Strategy;
User = mongoose.model('User');

/**
 * Expose
 */

module.exports = new LocalStrategy({
  usernameField: 'login',
  passwordField: 'password'
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
