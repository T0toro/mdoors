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

let home, user, attributes;

/*!
 * Module dependencies.
 */

home       = require('./../app/controllers/home');
user       = require('./../app/controllers/user');
attributes = require('./../app/controllers/attributes');

/*!
 * Expose
 */

module.exports = (app, passport) => {
  app.use((req, res, next) => {
    if (!req.url.search('.*dashboard.*') && !req.isAuthenticated()) {
      return res.redirect('/login');
    }

    res.locals.isAuthenticated = req.isAuthenticated();

    return next();
  });

  // --------------------------------------------
  // ---------------- Dashboard -----------------
  // --------------------------------------------

  app.get('/', (req, res)          => { return res.redirect('/dashboard'); });

  app.get('/dashboard', (req, res) => { return res.render('dashboard/home/index'); });

  // Login/Logout
  // --------------------------------------------

  app.get('/login', user.login);
  app.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/dashboard',
    failureFlash: true
  }));

  app.get('/logout', user.logout);

  // Attributes
  // --------------------------------------------

  app.get('/dashboard/attributes', attributes.index);
  app.get('/dashboard/attributes/create', attributes.create);
  app.get('/dashboard/attributes/edit/:id', attributes.edit);
  app.get('/dashboard/attributes/destroy/:id', attributes.destroy);

  app.post('/dashboard/attributes/store', attributes.store);
  app.post('/dashboard/attributes/update', attributes.update);
};
