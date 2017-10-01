/**
 * Product controller
 *
 * @module       :: controller
 * @description  :: keep logic for handle Product ( CRUD and etc )
 *
 *
 * Module dependencies
 */

const mongoose = require('mongoose');

const Product = mongoose.model('Product');

/*
 * Expos
 */


/**
 * Product list
 */

exports.index = async (req, res) => {
  const products = await Product.find();

  return res.render('dashboard/products/index', { products });
};

exports.create = (req, res) => res.render('dashboard/products/create');

exports.store = async (req, res) => {
  const userDate = req.body.manufactureDate.split('.');

  await Product.create({
    name: req.body.name,
    slug: req.body.slug,
    count: req.body.count,
    manufactureDate: new Date(userDate[2], userDate[1] - 1, userDate[0]),
  });

  return res.redirect('/dashboard/products');
};

exports.edit = async (req, res) => {
  const id = req.params.id || '';

  const product = await Product.findById(id);

  return res.render('dashboard/products/edit', { product });
};

exports.update = async (req, res) => {
  const id = req.body.id || '';
  const userDate = req.body.manufactureDate.split('.');

  Product.update({ _id: id }, {
    name: req.body.name,
    slug: req.body.slug,
    count: req.body.count,
    manufactureDate: new Date(userDate[2], userDate[1] - 1, userDate[0]),
  });

  return res.redirect('/dashboard/products');
};

exports.destroy = async (req, res) => {
  const id = req.params.id || '';

  await Product.findByIdAndRemove(id);

  return res.redirect('/dashboard/products');
};
