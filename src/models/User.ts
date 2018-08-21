/**
 * User model
 *
 * @module       :: model
 * @description  :: Represent user in database
 *
 * Dependencies
 */

import { Schema } from 'mongoose';
import { compareSync } from 'bcryptjs';

/**
 * Expo
 */

export default new Schema({
  name: String,
  lastname: String,
  login: String,
  telephone: String,
  password: String,
  departament: String,
  group: String,
}).methods
  .authenticate = (user: IUser, password: string) => compareSync(password, user.password);
