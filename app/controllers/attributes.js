/**
 * Attribute controller
 *
 * @module       :: controller
 * @description  :: keep logic for handle Attribute ( CRUD and etc )
 *
 *
 * Module dependencies
 */

const mongoose = require('mongoose');

const Product = mongoose.model('Product');
const Attribute = mongoose.model('Attribute');
const AttributeGroup = mongoose.model('AttributeGroup');

/*
 * Expos
 */


/**
 * Attribute list
 */

exports.index = async (req, res) => {
  const [attributeGroups, attributes, products] = await Promise.all([
    AttributeGroup.find(),
    Attribute.find(),
    Product.find(),
  ]);

  return res.render('dashboard/attributes/index', {
    attributeGroups,
    products,
    attributes,
  });
};

exports.create = async (req, res) => {
  const [attributeGroups, products] = await Promise.all([
    AttributeGroup.find(),
    Product.find(),
  ]);

  return res.render('dashboard/attributes/create', {
    products,
    attributeGroups,
  });
};

exports.store = async (req, res) => {
  await Attribute.create({
    name: req.body.name,
    group: [req.body.group],
    product: req.body.product,
  });

  return res.redirect('/dashboard/attributes');
};

exports.edit = async (req, res) => {
  const id = req.params.id || '';

  const [attributeGroups, attribute, products] = await Promise.all([
    AttributeGroup.find(),
    Attribute.findById(id),
    Product.find(),
  ]);

  return res.render('dashboard/attributes/edit', {
    attributeGroups,
    attribute,
    products,
  });
};

exports.update = async (req, res) => {
  const id = req.body.id || '';

  await Attribute.update({
    _id: id,
  }, {
    name: req.body.name,
    group: [req.body.group],
    product: req.body.product,
  });

  return res.redirect('/dashboard/attributes');
};

exports.destroy = async (req, res) => {
  const id = req.params.id || '';

  await Attribute.findByIdAndRemove(id);

  return res.redirect('/dashboard/attributes');
};
