'use strict';

/**
 * Set some settings then app start
 *
 * @module      :: app
 * @description :: this module start once then app start
 *
 *
 * Module dependencies
 */

const bcrypt   = require('bcryptjs'),
      mongoose = require('mongoose'),
      User     = mongoose.model('User');

/*!
 * Expose
 */

module.exports = (app) => {
  User.findOne({
    name: 'admin'
  }, (err, user) => {
    if (err) { return console.info('При поиске пользователя возникла ошибка: ', err); }

    if (!user) {
      User.create({
        name: 'admin',
        login: 'admin@mail.com',
        password: bcrypt.hashSync('123', 8),
      }, (err, user) => {
        if (err) { return console.info('При создании пользователя произошла ошибка: ', err); }

        return true;
      });
    }
  });
}
