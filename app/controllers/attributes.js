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
      Product         = mongoose.model('Product'),
      Attribute       = mongoose.model('Attribute'),
      AttributeGroup  = mongoose.model('AttributeGroup');

/*
 * Expos
 */


/**
 * Attribute list
 */

exports.index = (req, res, next) => {
  async.parallel([(cb) => {
    AttributeGroup
      .find()
      .exec((err, attributeGroups) => {
        return cb(err, attributeGroups);
      });
  }, (cb) => {
    Product
      .find()
      .exec((err, products) => {
        return cb(err, products);
      });
  }, (cb) => {
    Attribute
      .find()
      .exec((err, attributes) => {
        if (err) { return next(err); }

        return cb(err, attributes);
      });
  }], (err, result) => {
    if (err) { return next(err); }

    return res.render('dashboard/attributes/index', {
      attributeGroups: result[0],
      products: result[1],
      attributes: result[2]
    });
  });
};

exports.create = (req, res, next) => {
  async.parallel([(cb) => {
    AttributeGroup
      .find()
      .exec((err, attributeGroups) => {
        return cb(err, attributeGroups);
      });
  }, (cb) => {
    Product
      .find()
      .exec((err, products) => {
        return cb(err, products);
      });
  }], (err, result) => {
    if (err) { return next(err); }

    return res.render('dashboard/attributes/create', {
      products: result[1],
      attributeGroups: result[0]
    });
  });
};

exports.store = (req, res, next) => {
  Attribute.create({
    name: req.body.name,
    group: [req.body.group],
    product: req.body.product
  }, (err, attribute) => {
    if (err) { return next(err); }

    return res.redirect('/dashboard/attributes');
  });
};

exports.edit = (req, res, next) => {
  const id = req.params.id || '';

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
        .findById(id)
        .exec((err, attribute) => {
          return cb(err, attribute);
        });
    },
    (cb) => {
      AttributeGroup
        .find()
        .exec((err, attributeGroups) => {
          return cb(err, attributeGroups);
        });
    }], (err, result) => {
      if (err) { return next(err); }

      return res.render('dashboard/attributes/edit', {
        products: result[0],
        attribute: result[1],
        attributeGroups: result[2]
      });
  });


};

exports.update = (req, res, next) => {
  const id = req.body.id || '';

  Attribute.update({
    _id: id
  }, {
    name: req.body.name,
    group: [req.body.group],
    product: req.body.product
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
