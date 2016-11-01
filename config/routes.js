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
      user            = require('./../app/controllers/user'),
      orders          = require('./../app/controllers/orders'),
      products        = require('./../app/controllers/products'),
      attributes      = require('./../app/controllers/attributes'),
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
  app.get('/dashboard/orders/create', orders.create);
  app.get('/dashboard/orders/edit/:id', orders.edit);
  app.get('/dashboard/orders/destroy/:id', orders.destroy);

  app.post('/dashboard/orders/store', orders.store);
  app.post('/dashboard/orders/update', orders.update);
};
