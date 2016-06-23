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

exports.create = (req, res) => res.render('articles/create');

exports.store = (req, res, next) => {
    Article.create({
        title: req.body.title,
        description: req.body.description,
        name: req.body.name,
        content: req.body.content,
        status: req.body.status
    }, (err, article) => {
        if (err) return next(err);

        if (article) return res.redirect('/articles');
    });
};

exports.edit = (req, res) => {
    let id = req.body.id || '';

    Article.find(id, (err, article) => {
        if (err) return next(err);

        if (article) return res.render('articles/create', { article: article.pop() });
    });
};

exports.update = (req, res, next) => {
    Article.update({
        title: req.body.title,
        description: req.body.description,
        name: req.body.name,
        content: req.body.content,
        status: req.body.status
    }, (err, article) => {
        if (err) {
            return next(err);
        }

        if (article) {
            return res.redirect('/articles');
        }
    });
};