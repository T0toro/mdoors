'use strict';

/*!
 * Module dependencies.
 */

const mongoose = require('mongoose'),
      async    = require('async');

/*!
 * Expos
 */

exports.index = (req, res, next) => res.render('dashboard/home/index');
