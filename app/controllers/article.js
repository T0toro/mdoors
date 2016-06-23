'use strict';

/**
 * Article controller
 *
 * @module       :: controller
 * @description  :: keep logic for handle article ( CRUD and etc )
 */

/*
 * Module variables
 */

let mongoose, Article;

/*
 * Module dependencies
 */

mongoose = require('mongoose');
Article = mongoose.model('Article');

/*
 * Expos
 */


/**
 * Article list
 */

exports.index = (req, res, next) => {
    Article
        .find()
        .exec((err, articles) => {
            if (err) return next(err);

            if (Array.isArray(articles)) {
                res.json({
                    articles: articles
                });
            }
        });
};

exports.create = (req, res, next) => res.render('articles/create');

exports.store = (req, res, next) => {
    console.info(req.params.all());
};