/**
 * AttributeGroup
 *
 * @module       :: model
 * @description  :: Represent AttributeGroups in database
 *
 * Dependencies
 */

import { Schema } from 'mongoose';

/*!
 * AttributeGroup Schema
 */

export default new Schema({
  name: String,
  slug: String,
});
