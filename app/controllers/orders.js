'use strict';

/**
 * Order controller
 *
 * @module       :: controller
 * @description  :: keep logic for handle Order ( CRUD and etc )
 *
 *
 * Module dependencies
 */

const mongoose       = require('mongoose'),
      async          = require('async'),
      Product        = mongoose.model('Product'),
      Attribute      = mongoose.model('Attribute'),
      AttributeGroup = mongoose.model('AttributeGroup'),
      Order          = mongoose.model('Order');

/*!
 * Expos
 */


/**
 * Order list
 */

exports.index = (req, res, next) => {
  Order
    .find()
    .exec((err, orders) => {
      if (err) { return next(err); }

      if (Array.isArray(orders)) { return res.render('dashboard/orders/index', { orders: orders }); }

      return res.render('dashboard/orders/index');
    });
};

exports.create = (req, res, next) => {
  Product
    .find()
    .exec((err, products) => {
      if (err) { return next(err); }

      return res.render('dashboard/orders/create', {
        products: products
      });
    });
};

exports.store = (req, res, next) => {
  Order.create({
    title: req.body.title,
    description: req.body.description,
    name: req.body.name,
    content: req.body.content,
    status: req.body.status
  }, (err, order) => {
    if (err) { return next(err); }

    return res.redirect('/dashboard/orders');
  });
};

exports.edit = (req, res, next) => {
  const id = req.params.id || '';

  Order
    .findById(id)
    .exec((err, order) => {
      if (err) { return next(err); }

      if (Order) { return res.render('dashboard/orders/edit', { Order: Order }); }

      return res.redirect('/dashboard/orders');
    });
};

exports.update = (req, res, next) => {
  const id = req.body.id || '';

  Order.update({ _id: id }, {
    title: req.body.title,
    description: req.body.description,
    name: req.body.name,
    content: req.body.content,
    status: req.body.status,
    slug: req.body.slug
  }, (err, order) => {
    if (err) { return next(err); }

    return res.redirect('/dashboard/orders');
  });
};

exports.destroy = (req, res, next) => {
  const id = req.params.id || '';

  Order
    .findByIdAndRemove(id)
    .exec((err, order) => {
      if (err) { return next(err); }

      return res.redirect('/dashboard/orders');
    });
};

// JSON API
// ----------------------------------------------

exports.info = (req, res, next) => {
  async.parallel([
    (cb) => {
      Product
        .find()
        .exec((err, products) => {
          return cb(err, products);
        });
    },
    (cb) => {
      Attribute
        .find()
        .exec((err, attributes) => {
          return cb(err, attributes);
        });
    },
    (cb) => {
      AttributeGroup
        .find()
        .exec((err, attributeGroups) => {
          return cb(err, attributeGroups);
        });
    }],
    (err, result) => {
      if (err) { return next(err); }

      return res.json({
        products: result[0],
        attributes: result[1],
        attributeGroups: result[2]
      });
  });
}