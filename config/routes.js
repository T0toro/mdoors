'use strict';

/**
 * App routes
 *
 * @module      :: app
 * @description :: main app routes
 *
 * Module dependencies.
 */

const home            = require('./../app/controllers/home'),
      users           = require('./../app/controllers/users'),
      news            = require('./../app/controllers/news'),
      ozp             = require('./../app/controllers/ozp'),
      odds            = require('./../app/controllers/odds'),
      orders          = require('./../app/controllers/orders'),
      products        = require('./../app/controllers/products'),
      attributes      = require('./../app/controllers/attributes'),
      departaments    = require('./../app/controllers/departaments'),
      attributeGroups = require('./../app/controllers/attributeGroups');

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

  app.get('/dashboard', home.index);

  // Attributes
  // --------------------------------------------

  app.get('/dashboard/attributes', attributes.index);
  app.get('/dashboard/attributes/create', attributes.create);
  app.get('/dashboard/attributes/edit/:id', attributes.edit);
  app.get('/dashboard/attributes/destroy/:id', attributes.destroy);

  app.post('/dashboard/attributes/store', attributes.store);
  app.post('/dashboard/attributes/update', attributes.update);


  // Attributes
  // --------------------------------------------

  app.get('/dashboard/products', products.index);
  app.get('/dashboard/products/create', products.create);
  app.get('/dashboard/products/edit/:id', products.edit);
  app.get('/dashboard/products/destroy/:id', products.destroy);

  app.post('/dashboard/products/store', products.store);
  app.post('/dashboard/products/update', products.update);


  // AttributeGroup
  // --------------------------------------------

  app.get('/dashboard/attribute-groups', attributeGroups.index);
  app.get('/dashboard/attribute-groups/create', attributeGroups.create);
  app.get('/dashboard/attribute-groups/edit/:id', attributeGroups.edit);
  app.get('/dashboard/attribute-groups/destroy/:id', attributeGroups.destroy);

  app.post('/dashboard/attribute-groups/store', attributeGroups.store);
  app.post('/dashboard/attribute-groups/update', attributeGroups.update);


  // Orders
  // --------------------------------------------

  app.get('/dashboard/orders', orders.index);
  app.get('/dashboard/orders/info', orders.info);
  app.get('/dashboard/orders/create', orders.create);
  app.get('/dashboard/orders/show/:id', orders.show);
  app.get('/dashboard/orders/edit/:id', orders.edit);
  app.get('/dashboard/orders/destroy/:id', orders.destroy);

  app.post('/dashboard/orders/store', orders.store);
  app.post('/dashboard/orders/update', orders.update);


  // ozp
  // --------------------------------------------

  app.get('/dashboard/ozp', ozp.index);
  app.get('/dashboard/ozp/destroy/:id', ozp.destroy);

  app.post('/dashboard/ozp/store', ozp.store);
  app.post('/dashboard/ozp/filter', ozp.filter);

  // Odds
  // --------------------------------------------

  app.get('/dashboard/odds', odds.index);
  app.get('/dashboard/odds/destroy/:id', odds.destroy);

  app.post('/dashboard/odds/store', odds.store);

  // News
  // --------------------------------------------

  app.get('/dashboard/news', news.index);
  app.get('/dashboard/news/create', news.create);
  app.get('/dashboard/news/edit/:id', news.edit);
  app.get('/dashboard/news/destroy/:id', news.destroy);

  app.post('/dashboard/news/store', news.store);
  app.post('/dashboard/news/update', news.update);


  // Users
  // --------------------------------------------

  app.get('/dashboard/users', users.index);
  app.get('/dashboard/users/create', users.create);
  app.get('/dashboard/users/edit/:id', users.edit);
  app.get('/dashboard/users/destroy/:id', users.destroy);

  app.post('/dashboard/users/restore', users.restore);
  app.post('/dashboard/users/store', users.store);
  app.post('/dashboard/users/update', users.update);

  // Departaments
  // --------------------------------------------

  app.get('/dashboard/departaments', departaments.index);
  app.get('/dashboard/departaments/create', departaments.create);
  app.get('/dashboard/departaments/edit/:id', departaments.edit);
  app.get('/dashboard/departaments/destroy/:id', departaments.destroy);

  app.post('/dashboard/departaments/store', departaments.store);
  app.post('/dashboard/departaments/update', departaments.update);


  // Login/Logout
  // --------------------------------------------

  app.get('/login', users.login);
  app.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/dashboard',
    failureFlash: true
  }));

  app.get('/logout', users.logout);
};
