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
      moment   = require('moment'),
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
    .exec((err, products) => {
      if (err) { return next(err); }

      if (Array.isArray(products)) {
        return res.render('dashboard/products/index', { products: products });
      }

      return res.render('dashboard/products/index');
    });
};

exports.create = (req, res) => res.render('dashboard/products/create');

exports.store = (req, res, next) => {
  Product.create({
    name: req.body.name,
    slug: req.body.slug,
    count: req.body.count,
    manufactureDate: req.body.manufactureDate
  }, (err) => {
    if (err) { return next(err); }

    return res.redirect('/dashboard/products');
  });
};

exports.edit = (req, res, next) => {
  const id = req.params.id || '';

  Product
    .findById(id)
    .exec((err, product) => {
      if (err) { return next(err); }

      if (product) { return res.render('dashboard/products/edit', { product: product }); }

      return res.redirect('/dashboard/products');
    });
};

exports.update = (req, res, next) => {
  const id = req.body.id || '';

  Product.update({ _id: id }, {
    name: req.body.name,
    slug: req.body.slug,
    count: req.body.count,
    manufactureDate: req.body.manufactureDate
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
