'use strict';

/**
 * AttributeGroup controller
 *
 * @module       :: controller
 * @description  :: keep logic for handle AttributeGroup ( CRUD and etc )
 *
 *
 * Module dependencies
 */

const mongoose        = require('mongoose'),
      AttributeGroup  = mongoose.model('AttributeGroup');

/*
 * Expos
 */


/**
 * AttributeGroup list
 */

exports.index = (req, res, next) => {
  AttributeGroup
    .find()
    .exec((err, attributeGroups) => {
      if (err) { return next(err); }

      if (Array.isArray(attributeGroups)) {
        return res.render('dashboard/attribute_groups/index', {
            attributeGroups: attributeGroups
        });
      }

      return res.render('dashboard/attribute_groups/index');
    });
};

exports.create = (req, res) => res.render('dashboard/attribute_groups/create');

exports.store = (req, res, next) => {
  AttributeGroup.create({
    name: req.body.name,
    slug: req.body.slug
  }, (err, attributeGroups) => {
    if (err) { return next(err); }

    return res.redirect('/dashboard/attribute-groups');
  });
};

exports.edit = (req, res, next) => {
  const id = req.params.id || '';

  AttributeGroup
    .findById(id)
    .exec((err, attributeGroup) => {
      if (err) { return next(err); }

      if (attributeGroup) { return res.render('dashboard/attribute_groups/edit', { attributeGroup: attributeGroup }); }

      return res.redirect('/dashboard/attribute-groups');
    });
};

exports.update = (req, res, next) => {
  const id = req.body.id || '';

  AttributeGroup.update({ _id: id }, {
    name: req.body.name,
    slug: req.body.slug
  }, (err, attributeGroups) => {
    if (err) { return next(err); }

    return res.redirect('/dashboard/attribute-groups');
  });
};

exports.destroy = (req, res, next) => {
  const id = req.params.id || '';

  AttributeGroup
    .findByIdAndRemove(id)
    .exec((err, attributeGroups) => {
      if (err) { return next(err); }

      return res.redirect('/dashboard/attribute-groups');
    });
};
