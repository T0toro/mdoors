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

var home, user, article;

/*!
 * Module dependencies.
 */

home = require('./../app/controllers/home');
article = require('./../app/controllers/article');
user = require('./../app/controllers/user');

/*!
 * Expose
 */

module.exports = function(app, passport) {

  // Home
  // --------------------------------------------

  app.get('/', home.index);

  // Login/Logout
  // --------------------------------------------

  app.get('/login', user.login);
  app.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/dashboard',
    failureFlash: true
  }));

  // Article
  // --------------------------------------------

  app.get('/articles', article.index);
  app.get('/articles/create', article.create);
  app.get('/articles/edit/:id', article.edit);
  app.get('/articles/destroy/:id', article.destroy);

  app.post('/articles/store', article.store);
  app.post('/articles/update', article.update);


  // Dashboard
  // --------------------------------------------
  app.get('/dashboard', (req, res) => {
    console.info('Sessions: ', req.session);
    res.render('dashboard/index');
  });

};
