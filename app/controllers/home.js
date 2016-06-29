'use strict';

/*!
 * Module variables
 */

let mongoose, Article;

/*!
 * Module dependencies.
 */

mongoose = require('mongoose');
Article = mongoose.model('Article');

exports.index = (req, res, next) => {
  Article
    .find({ status: 1 })
    .exec((err, articles) => {
      if (err) { return next(err); }

      res.render('home/index', {
        title: 'Node Express Mongoose Boilerplate',
        articles: articles,
      });
    });
};
