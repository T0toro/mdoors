'use strict';

/**
 * Attribute controller
 *
 * @module       :: controller
 * @description  :: keep logic for handle Attribute ( CRUD and etc )
 */

/*
 * Module variables
 */

let mongoose, Attribute;

/*
 * Module dependencies
 */

mongoose = require('mongoose');
Attribute = mongoose.model('Attribute');

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

      return res.render(tpl);
    });
};

exports.create = (req, res) => res.render('dashboard/attributes/create');

exports.store = (req, res, next) => {
  Attribute.create({
    title: req.body.title,
    description: req.body.description,
    name: req.body.name,
    content: req.body.content,
    status: req.body.status
  }, (err, attribute) => {
    if (err) { return next(err); }

    return res.redirect('/dashboard/attributes');
  });
};

exports.edit = (req, res, next) => {
  let id = req.params.id || '';

  Attribute
    .findById(id)
    .exec((err, attribute) => {
      if (err) { return next(err); }

      if (attribute) { return res.render('dashboard/attributes/edit', { attribute: attribute }); }

      return res.redirect('/dashboard/attributes');
    });
};

exports.update = (req, res, next) => {
  let id = req.body.id || '';

  Attribute.update({ _id: id }, {
    title: req.body.title,
    description: req.body.description,
    name: req.body.name,
    content: req.body.content,
    status: req.body.status,
    slug: req.body.slug
  }, (err, attribute) => {
    if (err) { return next(err); }

    return res.redirect('/dashboard/attributes');
  });
};

exports.destroy = (req, res, next) => {
  let id = req.params.id || '';

  Attribute
    .findByIdAndRemove(id)
    .exec((err, attribute) => {
      if (err) { return next(err); }

      return res.redirect('/dashboard/attributes');
    });
};
