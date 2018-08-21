/**
 * Set some settings then app start
 *
 * @module      :: app
 * @description :: this module start once then app start
 *
 *
 * Module dependencies
 */

import UserSchema from '../models/User';

import { hashSync } from 'bcryptjs';
import { model } from 'mongoose';

/**
 * Model
 */

model('User', UserSchema);

/*!
 * Expo
 */

module.exports = async () => {
  const user = await User.findOne({ name: 'admin' });

  if (!!Object.keys(user).length) return true;

  try {
    await User.create({
      name: 'admin',
      group: 'accountant',
      login: 'admin@mail.com',
      password: hashSync('123', 8),
    });
  } catch (e) {
    return console.info('При создании пользователя произошла ошибка: ', e);
  }
};
