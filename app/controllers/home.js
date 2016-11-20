'use strict';

/*!
 * Module dependencies.
 */

const mongoose = require('mongoose'),
      async    = require('async'),
      News     = mongoose.model('News');

/*!
 * Expos
 */

exports.index = (req, res, next) => {
  News
    .find()
    .exec((err, news) => {
      if (err) { return next(err); }

      return res.render('dashboard/home/index', {
        news: news
      });
    });
};
