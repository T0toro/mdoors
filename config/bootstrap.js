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

module.exports = async (app) => {
  const user = await User.findOne({ name: 'admin' });
  
  if (!!Object.keys(user).length) return true;

  try {
    await User.create({
      name: 'admin',
      group: 'accountant',
      login: 'admin@mail.com',
      password: bcrypt.hashSync('123', 8),
    });
  } catch(e) {
    return console.info('При создании пользователя произошла ошибка: ', e);
  }
};
