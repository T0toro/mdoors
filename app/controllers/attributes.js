'use strict';

/**
 * Attribute controller
 *
 * @module       :: controller
 * @description  :: keep logic for handle Attribute ( CRUD and etc )
 *
 *
 * Module dependencies
 */

const mongoose        = require('mongoose'),
      async           = require('async'),
      Attribute       = mongoose.model('Attribute'),
      AttributeGroup  = mongoose.model('AttributeGroup');

/*
 * Expos
 */


/**
 * Attribute list
 */

exports.index = (req, res, next) => {
  Attribute
    .find()
    .exec((err, attributes) => {
      if (err) { return next(err); }

      if (Array.isArray(attributes)) { return res.render('dashboard/attributes/index', { attributes: attributes }); }

      return res.render('dashboard/attributes/index');
    });
};

exports.create = (req, res, next) => {
  AttributeGroup
    .find()
    .exec((err, attributeGroups) => {
      if (err) { return next(err); }

      if (Array.isArray(attributeGroups)) {
        return res.render('dashboard/attributes/create', {
            attributeGroups: attributeGroups
        });
      }

      return res.render('dashboard/attributes/create')
    });
};

exports.store = (req, res, next) => {
  Attribute.create({
    name: req.body.name,
    group: req.body.group
  }, (err, attribute) => {
    if (err) { return next(err); }

    return res.redirect('/dashboard/attributes');
  });
};

exports.edit = (req, res, next) => {
  const id = req.params.id || '';

  Attribute
    .findById(id)
    .exec((err, attribute) => {
      if (err) { return next(err); }

      if (attribute) { return res.render('dashboard/attributes/edit', { attribute: attribute }); }

      return res.redirect('/dashboard/attributes');
    });
};

exports.update = (req, res, next) => {
  const id = req.body.id || '';

  Attribute.update({ _id: id }, {
    name: req.body.name,
    group: req.body.group
  }, (err) => {
    if (err) { return next(err); }

    return res.redirect('/dashboard/attributes');
  });
};

exports.destroy = (req, res, next) => {
  const id = req.params.id || '';

  Attribute
    .findByIdAndRemove(id)
    .exec((err) => {
      if (err) { return next(err); }

      return res.redirect('/dashboard/attributes');
    });
};
