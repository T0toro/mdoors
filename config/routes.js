'use strict';

/**
 * App routes
 *
 * @module      :: app
 * @description :: main app routes
 */

/*!
 * Module variables
 */

var home, article;

/*!
 * Module dependencies.
 */

home = require('./../app/controllers/home');
article = require('./../app/controllers/article');

/*!
 * Expose
 */

module.exports = function(app, passport) {

  // Home
  // --------------------------------------------

  app.get('/', home.index);

  // Article
  // --------------------------------------------

  app.get('/articles', article.index);
  app.get('/articles/create', article.create);
  app.get('/articles/edit/:id', article.edit);
  app.get('/articles/destroy/:id', article.destroy);

  // app.post('/articles/store', article.store);
  // app.post('/articles/update', article.update);
};
