'use strict';

/**
 * Product controller
 *
 * @module       :: controller
 * @description  :: keep logic for handle Product ( CRUD and etc )
 *
 *
 * Module dependencies
 */

const mongoose = require('mongoose'),
      Product = mongoose.model('Product');

/*
 * Expos
 */


/**
 * Product list
 */

exports.index = (req, res, next) => {
  Product
    .find()
    .exec((err, product) => {
      if (err) { return next(err); }

      if (Array.isArray(product)) { return res.render('dashboard/products/index', { products: products }); }

      return res.render('dashboard/products/index');
    });
};

exports.create = (req, res) => res.render('dashboard/products/create');

exports.store = (req, res, next) => {
  Product.create({
    name: req.body.name,
    group: req.body.group
  }, (err) => {
    if (err) { return next(err); }

    return res.redirect('/dashboad/products');
  });
};

exports.edit = (req, res, next) => {
  const id = req.params.id || '';

  Product
    .findById(id)
    .exec((err, product) => {
      if (err) { return next(err); }

      if (product) { return res.render('dashboard/products/edit', { product: product.pop() }); }

      return res.redirect('/dashboard/products');
    });
};

exports.update = (req, res, next) => {
  const id = req.body.id || '';

  Product.update({ _id: id }, {
    name: req.body.name,
    group: req.body.group
  }, (err) => {
    if (err) { return next(err); }

    return res.redirect('/dashboard/products');
  });
};

exports.destroy = (req, res, next) => {
  const id = req.params.id || '';

  Product
    .findByIdAndRemove(id)
    .exec((err) => {
      if (err) { return next(err); }

      return res.redirect('/dashboard/products');
    });
};
