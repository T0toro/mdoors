'use strict';

/**
 * App routes
 *
 * @module      :: app
 * @description :: main app routes
 */

/**
 * Module variables
 */

var mongoose, home, article;

/**
 * Module dependencies.
 */

home    = require('./../app/controllers/home');
article = require('./../app/controllers/article');

/**
 * Expose
 */

module.exports = function (app, passport) {

  // Home
  //--------------------------------------------

  app.get('/', home.index);

  // Article
  //--------------------------------------------

  app.get('/articles', article.index);
  app.get('/articles/create', article.create);
  app.post('/articles/store', article.store);
};
