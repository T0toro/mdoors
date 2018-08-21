/**
 * Departament
 *
 * @module       :: model
 * @description  :: Represent Departaments in database
 *
 * Dependencies
 */

import { Schema } from 'mongoose';

/**
 * Schema
 */

export default new Schema({
  name: {
    type: String,
    default: '',
  },
  address: {
    type: String,
    default: '',
  },
  telephone: {
    type: String,
    default: '',
  },
});
