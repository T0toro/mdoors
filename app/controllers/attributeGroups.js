/**
 * AttributeGroup controller
 *
 * @module       :: controller
 * @description  :: keep logic for handle AttributeGroup ( CRUD and etc )
 *
 *
 * Module dependencies
 */

const mongoose = require('mongoose');

const AttributeGroup = mongoose.model('AttributeGroup');

/*
 * Expos
 */


/**
 * AttributeGroup list
 */

exports.index = async (req, res) => {
  const attributeGroups = AttributeGroup.find();

  return res.render('dashboard/attribute_groups/index', { attributeGroups });
};

exports.create = (req, res) => res.render('dashboard/attribute_groups/create');

exports.store = async (req, res) => {
  await AttributeGroup.create({
    name: req.body.name,
    slug: req.body.slug,
  });

  return res.redirect('/dashboard/attribute-groups');
};

exports.edit = async (req, res) => {
  const id = req.params.id || '';

  await AttributeGroup.findById(id);

  return res.redirect('/dashboard/attribute-groups');
};

exports.update = async (req, res) => {
  const id = req.body.id || '';

  await AttributeGroup.update({ _id: id }, {
    name: req.body.name,
    slug: req.body.slug,
  });

  return res.redirect('/dashboard/attribute-groups');
};

exports.destroy = async (req, res) => {
  const id = req.params.id || '';

  AttributeGroup.findByIdAndRemove(id);

  return res.redirect('/dashboard/attribute-groups');
};
