'use strict';

/**
 * AttributeGroup controller
 *
 * @module       :: controller
 * @description  :: keep logic for handle AttributeGroup ( CRUD and etc )
 */

/*
 * Module variables
 */

let mongoose, AttributeGroup;

/*
 * Module dependencies
 */

mongoose = require('mongoose');
AttributeGroup = mongoose.model('AttributeGroup');

/*
 * Expos
 */


/**
 * AttributeGroup list
 */

exports.index = (req, res, next) => {
  let tpl = req.isAuthenticated() ? 'dashboard/attribute_groups/index' : 'attribute_groups/index';

  AttributeGroup
    .find()
    .exec((err, attributeGroups) => {
      if (err) { return next(err); }

      if (Array.isArray(attributeGroups)) { return res.render(tpl, { attributeGroups: attributeGroups }); }

      return res.render(tpl);
    });
};

exports.create = (req, res) => res.render('dashboard/attributeGroups/create');

exports.store = (req, res, next) => {
  AttributeGroup.create({
    title: req.body.title,
    description: req.body.description,
    name: req.body.name,
    content: req.body.content,
    status: req.body.status
  }, (err, AttributeGroup) => {
    if (err) { return next(err); }

    return res.redirect('/dashboard/attributeGroups');
  });
};

exports.edit = (req, res, next) => {
  let id = req.params.id || '';

  AttributeGroup
    .findById(id)
    .exec((err, attributeGroup) => {
      if (err) { return next(err); }

      if (attributeGroup) { return res.render('dashboard/attributeGroups/edit', { attributeGroup: attributeGroup }); }

      return res.redirect('/dashboard/attributeGroups');
    });
};

exports.update = (req, res, next) => {
  let id = req.body.id || '';

  AttributeGroup.update({ _id: id }, {
    title: req.body.title,
    description: req.body.description,
    name: req.body.name,
    content: req.body.content,
    status: req.body.status,
    slug: req.body.slug
  }, (err, attributeGroup) => {
    if (err) { return next(err); }

    return res.redirect('/dashboard/attributeGroups');
  });
};

exports.destroy = (req, res, next) => {
  let id = req.params.id || '';

  AttributeGroup
    .findByIdAndRemove(id)
    .exec((err, attributeGroup) => {
      if (err) { return next(err); }

      return res.redirect('/dashboard/attributeGroups');
    });
};