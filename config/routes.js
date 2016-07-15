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

let home, user, article;

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

  app.use((req, res, next) => {
    if(!req.url.search('.*dashboard.*') && !req.isAuthenticated()) {
      return res.redirect('/login');
    }

    return next();
  });

  // Home
  // --------------------------------------------

  app.get('/', home.index);

  // Article
  // --------------------------------------------

  app.get('/articles', article.index);

  // --------------------------------------------
  // ---------------- Dashboard -----------------
  // --------------------------------------------

  app.get('/dashboard', (req, res) => {
    res.render('dashboard/home/index');
  });

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


  app.get('/dashboard/articles', article.index);
  app.get('/dashboard/articles/create', article.create);
  app.get('/dashboard/articles/edit/:id', article.edit);
  app.get('/dashboard/articles/destroy/:id', article.destroy);

  app.post('/dashboard/articles/store', article.store);
  app.post('/dashboard/articles/update', article.update);

};
