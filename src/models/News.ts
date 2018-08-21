/**
 * News
 *
 * @module       :: model
 * @description  :: Represent news in database
 *
 * Dependencies
 */

import { Schema } from 'mongoose';

/*
 * News Schema
 */

export default new Schema({
  name: String,
  content: String,
  thumb: String,
});
